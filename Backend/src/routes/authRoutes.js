import express from 'express';
import {
  studentLogin,
  teacherLogin,
  studentRegister,
  teacherRegister
} from '../controllers/authController.js';

const router = express.Router();

// Student routes
router.post('/student/login', studentLogin);
router.post('/student/register',studentRegister);

// Teacher routes
router.post('/teacher/login', teacherLogin);
router.post('/teacher/register', teacherRegister);
export default router;
