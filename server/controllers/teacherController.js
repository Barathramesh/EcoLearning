import { validationResult } from 'express-validator';
import Teacher from '../models/Teacher.js';
import bcrypt from 'bcryptjs';


// Teacher Login
export const teacherLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { teacherId, password } = req.body;
    const teacher = await Teacher.findOne({ teacherId });
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
          Name: teacher.Name,
          teacherId: teacher.teacherId,
          email: teacher.email,
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

// Teacher Registration
export const teacherRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { Name, password, email, phone, teacherId } = req.body;

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ 
      $or: [{ email }, { phone }, { teacherId }]
    });
    
    if (existingTeacher) {
      return res.status(400).json({ 
        success: false, 
        message: 'Teacher already exists with this email, phone, or teacherId' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new teacher
    const teacher = await Teacher.create({
      Name,
      email,
      phone,
      teacherId,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: {
          id: teacher._id,
          Name: teacher.Name,
          teacherId: teacher.teacherId,
          email: teacher.email,
          role: 'teacher'
        }
      }
    });
  } catch (error) {
    console.error('Teacher registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
};