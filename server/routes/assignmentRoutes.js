import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  submitAssignment,
  submitAssignmentWithImages,
  getAssignmentStatus,
  getStudentAssignments,
  getVerificationReport,
  teacherReview,
  getFlaggedAssignments,
  extractTextFromImage
} from '../controllers/assignmentController.js';

const router = express.Router();

// Configure multer for file uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/assignments'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Student routes
router.post('/submit', upload.array('files', 5), submitAssignment);
router.post('/submit-handwritten', submitAssignmentWithImages);
router.post('/extract-text', extractTextFromImage); // OCR endpoint
router.get('/status/:assignmentId', getAssignmentStatus);
router.get('/student/:studentId', getStudentAssignments);
router.get('/report/:assignmentId', getVerificationReport);

// Teacher routes
router.post('/review/:assignmentId', teacherReview);
router.get('/flagged', getFlaggedAssignments);

export default router;
