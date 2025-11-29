import express from 'express';
import { studentLogin,teacherLogin } from '../controllers/authController.js';

const router = express.Router();

// Student routes
router.post('/student/login', studentLogin);

// Teacher routes
router.post('/teacher/login', teacherLogin);

export default router;
