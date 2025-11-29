import { validationResult } from 'express-validator';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import bcrypt from 'bcryptjs';

// Student Login
export const studentLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { username, password } = req.body;
    const student = await Student.findOne({ username });
    if (!student) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: student._id,
          username: student.username,
          role: 'student'
        }
      }
    });
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
};

// Teacher Login
export const teacherLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { username, password } = req.body;
    const teacher = await Teacher.findOne({ username });
    if (!teacher) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }


    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: teacher._id,
          username: teacher.username,
          role: 'teacher'
        }
      }
    });
  } catch (error) {
    console.error('Teacher login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
};

