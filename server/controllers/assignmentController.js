import Assignment from '../models/Assignment.js';
import ocrService from '../services/ocrService.js';
import aiGradingService from '../services/aiGradingService.js';
import fs from 'fs';
import path from 'path';

/**
 * Extract text from a single image using OCR (for real-time preview)
 */
export const extractTextFromImage = async (req, res) => {
  try {
    const { image, filename } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'No image data provided'
      });
    }

    console.log(`Extracting text from image: ${filename || 'unknown'}`);

    // Extract text using OCR service (optimized for handwriting)
    const ocrResult = await ocrService.extractTextFromBase64(image);
    const qualityCheck = ocrService.checkTextQuality(ocrResult.text, ocrResult.confidence);

    console.log(`OCR Result: ${ocrResult.words} words, Confidence: ${ocrResult.confidence}%`);

    // Format the response with detailed word info
    res.json({
      success: true,
      text: ocrResult.text,
      rawText: ocrResult.rawText || ocrResult.text,
      confidence: ocrResult.confidence,
      wordCount: ocrResult.words,
      lineCount: ocrResult.lines || 0,
      quality: qualityCheck.quality,
      isReadable: qualityCheck.isReadable,
      qualityMessage: qualityCheck.message,
      filename: filename || 'uploaded_image',
      // Include word-level details for transparency
      wordDetails: ocrResult.wordDetails || [],
      tips: getHandwritingTips(ocrResult.confidence)
    });
  } catch (error) {
    console.error('Extract Text Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to extract text from image',
      error: error.message,
      tips: [
        'Ensure the image is well-lit and in focus',
        'Try to write with clear, separated letters',
        'Use dark ink on white/light paper',
        'Avoid shadows on the document'
      ]
    });
  }
};

/**
 * Get tips based on OCR confidence
 */
function getHandwritingTips(confidence) {
  if (confidence >= 70) {
    return ['Text was recognized clearly!'];
  } else if (confidence >= 50) {
    return [
      'Some words may be inaccurate',
      'Consider writing more clearly for better results'
    ];
  } else if (confidence >= 30) {
    return [
      'Text recognition was difficult',
      'Try using printed/block letters instead of cursive',
      'Ensure better lighting when capturing the image'
    ];
  } else {
    return [
      'Very low confidence in text recognition',
      'Please use clearer handwriting or print',
      'Make sure the image is not blurry',
      'Use dark ink on light paper',
      'Consider typing the content instead'
    ];
  }
}

/**
 * Submit a new assignment
 */
export const submitAssignment = async (req, res) => {
  try {
    const { title, subject, topic, description, studentId } = req.body;
    const files = req.files || [];

    // Create assignment record
    const assignment = new Assignment({
      studentId,
      title,
      subject,
      topic,
      description,
      status: 'processing',
      files: []
    });

    // Process uploaded files
    let fullContent = description + '\n\n';

    for (const file of files) {
      const fileData = {
        fileName: file.originalname,
        filePath: file.path,
        fileType: file.mimetype,
        fileSize: file.size,
        extractedText: ''
      };

      // If image file, extract text using OCR
      if (file.mimetype.startsWith('image/')) {
        try {
          const ocrResult = await ocrService.extractTextFromImage(file.path);
          fileData.extractedText = ocrResult.text;
          fullContent += ocrResult.text + '\n\n';
          console.log(`OCR extracted ${ocrResult.words} words from ${file.originalname}`);
        } catch (ocrError) {
          console.error('OCR Error:', ocrError);
          fileData.extractedText = 'OCR extraction failed';
        }
      }

      assignment.files.push(fileData);
    }

    await assignment.save();

    // Start AI verification in background
    processAssignmentAsync(assignment._id, fullContent, topic, subject);

    res.status(201).json({
      success: true,
      message: 'Assignment submitted successfully. AI verification in progress.',
      data: {
        assignmentId: assignment._id,
        status: 'processing'
      }
    });
  } catch (error) {
    console.error('Submit Assignment Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit assignment',
      error: error.message
    });
  }
};

/**
 * Submit assignment with base64 images (for handwritten documents)
 */
export const submitAssignmentWithImages = async (req, res) => {
  try {
    const { title, subject, topic, description, studentId, images } = req.body;

    // Create assignment record
    const assignment = new Assignment({
      studentId,
      title,
      subject,
      topic,
      description,
      status: 'processing',
      files: []
    });

    let fullContent = description + '\n\n';

    // Process base64 images with OCR
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        try {
          const ocrResult = await ocrService.extractTextFromBase64(images[i]);
          const qualityCheck = ocrService.checkTextQuality(ocrResult.text, ocrResult.confidence);
          
          assignment.files.push({
            fileName: `handwritten_page_${i + 1}.jpg`,
            filePath: 'base64_upload',
            fileType: 'image/jpeg',
            fileSize: images[i].length,
            extractedText: ocrResult.text
          });

          if (qualityCheck.isReadable) {
            fullContent += ocrResult.text + '\n\n';
          }

          console.log(`OCR Page ${i + 1}: ${ocrResult.words} words, Quality: ${qualityCheck.quality}`);
        } catch (ocrError) {
          console.error(`OCR Error for image ${i + 1}:`, ocrError);
        }
      }
    }

    await assignment.save();

    // Start AI verification
    processAssignmentAsync(assignment._id, fullContent, topic, subject);

    res.status(201).json({
      success: true,
      message: 'Handwritten assignment submitted. OCR and AI verification in progress.',
      data: {
        assignmentId: assignment._id,
        status: 'processing',
        pagesProcessed: images?.length || 0
      }
    });
  } catch (error) {
    console.error('Submit Handwritten Assignment Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit handwritten assignment',
      error: error.message
    });
  }
};

/**
 * Process assignment with AI verification (async)
 */
async function processAssignmentAsync(assignmentId, content, topic, subject) {
  try {
    console.log(`Starting AI verification for assignment: ${assignmentId}`);
    
    // Verify with AI
    const verificationResult = await aiGradingService.verifyAssignment(content, topic, subject);

    // Update assignment with results
    await Assignment.findByIdAndUpdate(assignmentId, {
      aiVerification: verificationResult,
      status: verificationResult.flags.length > 0 ? 'flagged' : 'verified',
      flags: verificationResult.flags,
      finalGrade: {
        score: verificationResult.overallAssessment.totalScore,
        grade: verificationResult.overallAssessment.grade,
        gradedBy: 'AI'
      }
    });

    console.log(`AI verification completed for assignment: ${assignmentId}`);
    console.log(`Grade: ${verificationResult.overallAssessment.grade}, Flags: ${verificationResult.flags.length}`);
  } catch (error) {
    console.error('AI Verification Error:', error);
    
    // Update status to indicate error
    await Assignment.findByIdAndUpdate(assignmentId, {
      status: 'submitted',
      'aiVerification.isVerified': false
    });
  }
}

/**
 * Get assignment verification status
 */
export const getAssignmentStatus = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    
    const assignment = await Assignment.findById(assignmentId)
      .populate('studentId', 'name rollNumber');

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: assignment._id,
        title: assignment.title,
        subject: assignment.subject,
        topic: assignment.topic,
        status: assignment.status,
        submittedAt: assignment.submittedAt,
        aiVerification: assignment.aiVerification,
        finalGrade: assignment.finalGrade,
        flags: assignment.flags,
        student: assignment.studentId
      }
    });
  } catch (error) {
    console.error('Get Assignment Status Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get assignment status',
      error: error.message
    });
  }
};

/**
 * Get all assignments for a student
 */
export const getStudentAssignments = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const assignments = await Assignment.find({ studentId })
      .sort({ submittedAt: -1 })
      .select('title subject topic status submittedAt finalGrade flags aiVerification.overallAssessment');

    res.json({
      success: true,
      data: assignments
    });
  } catch (error) {
    console.error('Get Student Assignments Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get assignments',
      error: error.message
    });
  }
};

/**
 * Get detailed verification report
 */
export const getVerificationReport = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    
    const assignment = await Assignment.findById(assignmentId)
      .populate('studentId', 'name rollNumber email');

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    if (!assignment.aiVerification?.isVerified) {
      return res.json({
        success: true,
        data: {
          status: 'processing',
          message: 'AI verification is still in progress'
        }
      });
    }

    res.json({
      success: true,
      data: {
        assignment: {
          id: assignment._id,
          title: assignment.title,
          subject: assignment.subject,
          topic: assignment.topic,
          description: assignment.description,
          submittedAt: assignment.submittedAt
        },
        student: assignment.studentId,
        verification: {
          topicRelevance: assignment.aiVerification.topicRelevance,
          plagiarismCheck: assignment.aiVerification.plagiarismCheck,
          contentQuality: assignment.aiVerification.contentQuality,
          aiContentDetection: assignment.aiVerification.aiContentDetection,
          overallAssessment: assignment.aiVerification.overallAssessment
        },
        finalGrade: assignment.finalGrade,
        flags: assignment.flags,
        teacherReview: assignment.teacherReview
      }
    });
  } catch (error) {
    console.error('Get Verification Report Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get verification report',
      error: error.message
    });
  }
};

/**
 * Teacher review and override
 */
export const teacherReview = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { teacherId, manualGrade, manualScore, teacherFeedback, overrideAI } = req.body;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    assignment.teacherReview = {
      isReviewed: true,
      reviewedBy: teacherId,
      reviewedAt: new Date(),
      manualGrade,
      manualScore,
      teacherFeedback,
      overrideAI
    };

    if (overrideAI) {
      assignment.finalGrade = {
        score: manualScore,
        grade: manualGrade,
        gradedBy: 'Teacher'
      };
    }

    assignment.status = 'reviewed';
    await assignment.save();

    res.json({
      success: true,
      message: 'Teacher review submitted successfully',
      data: {
        finalGrade: assignment.finalGrade,
        teacherReview: assignment.teacherReview
      }
    });
  } catch (error) {
    console.error('Teacher Review Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit teacher review',
      error: error.message
    });
  }
};

/**
 * Get flagged assignments (for teacher dashboard)
 */
export const getFlaggedAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ 
      status: 'flagged',
      flags: { $exists: true, $ne: [] }
    })
    .populate('studentId', 'name rollNumber class')
    .sort({ submittedAt: -1 });

    res.json({
      success: true,
      data: assignments.map(a => ({
        id: a._id,
        title: a.title,
        subject: a.subject,
        topic: a.topic,
        student: a.studentId,
        flags: a.flags,
        submittedAt: a.submittedAt,
        aiGrade: a.finalGrade
      }))
    });
  } catch (error) {
    console.error('Get Flagged Assignments Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get flagged assignments',
      error: error.message
    });
  }
};
