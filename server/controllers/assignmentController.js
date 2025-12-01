import Assignment from '../models/Assignment.js';
import Class from '../models/Class.js';
import Student from '../models/Student.js';

// Create a new assignment
export const createAssignment = async (req, res) => {
  try {
    const { title, subject, description, classId, className, maxPoints, type, teacherId, teacherName, dueDate } = req.body;

    // Validate required fields
    if (!title || !subject || !classId || !className || !teacherId || !teacherName || !dueDate) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields: title, subject, classId, className, teacherId, teacherName, dueDate' 
      });
    }

    // Get total students from class
    let totalStudents = 0;
    try {
      const classData = await Class.findById(classId);
      if (classData) {
        // Count students matching the class
        const studentCount = await Student.countDocuments({
          studentClass: { $regex: new RegExp(`${classData.grade}.*${classData.section}`, 'i') }
        });
        totalStudents = studentCount;
      }
    } catch (err) {
      console.error('Error counting students:', err);
    }

    const assignment = new Assignment({
      title,
      subject,
      description: description || '',
      classId,
      className,
      maxPoints: maxPoints || 100,
      type: type || 'traditional',
      dueDate,
      totalStudents,
      submissions: 0,
      avgScore: 0,
      teacherId,
      teacherName,
      status: 'published'
    });

    await assignment.save();

    res.status(201).json({
      success: true,
      message: 'Assignment published successfully',
      assignment
    });
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ success: false, message: 'Error creating assignment', error: error.message });
  }
};

// Get all assignments for a specific class
export const getAssignmentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const assignments = await Assignment.find({ 
      classId, 
      status: 'published' 
    }).sort({ createdAt: -1 });

    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
};

// Get all assignments for a teacher
export const getAssignmentsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const assignments = await Assignment.find({ teacherId }).sort({ createdAt: -1 });

    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
};

// Get a single assignment by ID
export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json(assignment);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ message: 'Error fetching assignment', error: error.message });
  }
};

// Update an assignment
export const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const assignment = await Assignment.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json({
      message: 'Assignment updated successfully',
      assignment
    });
  } catch (error) {
    console.error('Error updating assignment:', error);
    res.status(500).json({ message: 'Error updating assignment', error: error.message });
  }
};

// Delete an assignment
export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findByIdAndDelete(id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).json({ message: 'Error deleting assignment', error: error.message });
  }
};

// Get assignments by class grade and section
export const getAssignmentsByGradeSection = async (req, res) => {
  try {
    const { grade, section } = req.params;
    const className = `${grade}-${section}`;

    const assignments = await Assignment.find({ 
      className: { $regex: new RegExp(`^${grade}.*${section}$`, 'i') },
      status: 'published' 
    }).sort({ createdAt: -1 });

    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
};
