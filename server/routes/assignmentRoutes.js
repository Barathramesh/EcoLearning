import express from 'express';
import {
  createAssignment,
  getAssignmentsByClass,
  getAssignmentsByTeacher,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  getAssignmentsByGradeSection,
  extractTextFromImage,
  generateExpectedAnswer
} from '../controllers/assignmentController.js';

const router = express.Router();

// Create a new assignment
router.post('/create', createAssignment);

// Extract text from image using OCR
router.post('/extract-text', extractTextFromImage);

// Generate expected answer using AI
router.post('/generate-answer', generateExpectedAnswer);

// Get all assignments for a specific class (by classId)
router.get('/class/:classId', getAssignmentsByClass);

// Get all assignments by grade and section
router.get('/class/:grade/:section', getAssignmentsByGradeSection);

// Get all assignments for a teacher
router.get('/teacher/:teacherId', getAssignmentsByTeacher);

// Get a single assignment by ID
router.get('/:id', getAssignmentById);

// Update an assignment
router.put('/:id', updateAssignment);

// Delete an assignment
router.delete('/:id', deleteAssignment);

export default router;
