import express from 'express';
import {
  submitAssignment,
  getStudentSubmissions,
  getAssignmentSubmissions,
  gradeSubmission,
  checkSubmission,
  getStudentAssignmentsWithStatus
} from '../controllers/submissionController.js';

const router = express.Router();

// Submit an assignment
router.post('/submit', submitAssignment);

// Get all submissions for a student
router.get('/student/:studentId', getStudentSubmissions);

// Get all submissions for an assignment
router.get('/assignment/:assignmentId', getAssignmentSubmissions);

// Get student assignments with submission status
router.get('/student/:studentId/class/:grade/:section', getStudentAssignmentsWithStatus);

// Check if student has submitted an assignment
router.get('/check/:assignmentId/:studentId', checkSubmission);

// Grade a submission
router.put('/grade/:submissionId', gradeSubmission);

export default router;
