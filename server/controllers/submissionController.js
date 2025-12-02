import Submission from '../models/Submission.js';
import Assignment from '../models/Assignment.js';

// Submit an assignment
export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, studentId, studentName, studentRollNumber, content, files } = req.body;

    // Check if assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check if already submitted
    const existingSubmission = await Submission.findOne({ assignmentId, studentId });
    if (existingSubmission) {
      return res.status(400).json({ message: 'You have already submitted this assignment' });
    }

    // Check if submission is late
    const isLate = new Date() > new Date(assignment.dueDate);

    // Create submission
    const submission = new Submission({
      assignmentId,
      studentId,
      studentName,
      studentRollNumber,
      content,
      files: files || [],
      status: isLate ? 'late' : 'submitted'
    });

    await submission.save();

    // Update assignment submission count
    await Assignment.findByIdAndUpdate(assignmentId, {
      $inc: { submissions: 1 }
    });

    res.status(201).json({ 
      message: 'Assignment submitted successfully',
      submission 
    });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({ message: 'Error submitting assignment', error: error.message });
  }
};

// Get all submissions for a student
export const getStudentSubmissions = async (req, res) => {
  try {
    const { studentId } = req.params;

    const submissions = await Submission.find({ studentId })
      .populate('assignmentId')
      .sort({ submittedAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching student submissions:', error);
    res.status(500).json({ message: 'Error fetching submissions', error: error.message });
  }
};

// Get all submissions for an assignment
export const getAssignmentSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const submissions = await Submission.find({ assignmentId })
      .sort({ submittedAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching assignment submissions:', error);
    res.status(500).json({ message: 'Error fetching submissions', error: error.message });
  }
};

// Grade a submission
export const gradeSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { grade, score, feedback, gradedBy } = req.body;

    const submission = await Submission.findByIdAndUpdate(
      submissionId,
      {
        grade,
        score,
        feedback,
        gradedBy,
        status: 'graded',
        gradedAt: new Date()
      },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Update assignment average score
    const allSubmissions = await Submission.find({ 
      assignmentId: submission.assignmentId,
      status: 'graded',
      score: { $ne: null }
    });

    if (allSubmissions.length > 0) {
      const totalScore = allSubmissions.reduce((sum, sub) => sum + (sub.score || 0), 0);
      const avgScore = totalScore / allSubmissions.length;

      await Assignment.findByIdAndUpdate(submission.assignmentId, {
        avgScore: Math.round(avgScore * 10) / 10
      });
    }

    res.status(200).json({ 
      message: 'Submission graded successfully',
      submission 
    });
  } catch (error) {
    console.error('Error grading submission:', error);
    res.status(500).json({ message: 'Error grading submission', error: error.message });
  }
};

// Check if student has submitted an assignment
export const checkSubmission = async (req, res) => {
  try {
    const { assignmentId, studentId } = req.params;

    const submission = await Submission.findOne({ assignmentId, studentId });

    res.status(200).json({ 
      hasSubmitted: !!submission,
      submission: submission || null
    });
  } catch (error) {
    console.error('Error checking submission:', error);
    res.status(500).json({ message: 'Error checking submission', error: error.message });
  }
};

// Get student's assignments with submission status
export const getStudentAssignmentsWithStatus = async (req, res) => {
  try {
    const { studentId, grade, section } = req.params;
    
    // Build multiple possible className formats to match
    // Student class format: "5-A" 
    // Assignment className format could be: "Grade 5th - Section A" or "5-A"
    const simpleClassName = `${grade}-${section}`;
    
    // Convert grade number to ordinal (5 -> 5th, 1 -> 1st, etc.)
    const getOrdinal = (n) => {
      const num = parseInt(n);
      if (num === 1) return '1st';
      if (num === 2) return '2nd';
      if (num === 3) return '3rd';
      return `${num}th`;
    };
    
    const fullClassName = `Grade ${getOrdinal(grade)} - Section ${section}`;

    // Get all assignments for this class (match either format)
    const assignments = await Assignment.find({ 
      $or: [
        { className: simpleClassName },
        { className: fullClassName },
        { className: { $regex: new RegExp(`${grade}.*${section}`, 'i') } }
      ],
      status: 'published'
    }).sort({ dueDate: 1 });

    // Get all submissions by this student
    const submissions = await Submission.find({ studentId });
    const submissionMap = {};
    submissions.forEach(sub => {
      submissionMap[sub.assignmentId.toString()] = sub;
    });

    // Combine assignments with submission status
    const assignmentsWithStatus = assignments.map(assignment => {
      const submission = submissionMap[assignment._id.toString()];
      const dueDate = new Date(assignment.dueDate);
      const now = new Date();
      const isPastDue = now > dueDate;

      return {
        _id: assignment._id,
        title: assignment.title,
        description: assignment.description,
        subject: assignment.subject,
        className: assignment.className,
        maxPoints: assignment.maxPoints,
        type: assignment.type,
        dueDate: assignment.dueDate,
        teacherName: assignment.teacherName,
        isPastDue,
        hasSubmitted: !!submission,
        submission: submission ? {
          _id: submission._id,
          submittedAt: submission.submittedAt,
          status: submission.status,
          grade: submission.grade,
          score: submission.score,
          feedback: submission.feedback
        } : null
      };
    });

    res.status(200).json(assignmentsWithStatus);
  } catch (error) {
    console.error('Error fetching student assignments:', error);
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
};
