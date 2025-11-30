import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import Student from '../models/Student.js';

// Student Login
export const studentLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { rollNumber, password } = req.body;
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(401).json({ 
        success: false, 
        message: 'No rollnumber found' 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid password' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: student._id,
          name: student.name,
          rollNumber: student.rollNumber,
          email: student.email,
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


//  Student Registration
export const studentRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, class: studentClass, rollNumber, email, phone, joinDate, address, password } = req.body;

    const existingStudent = await Student.findOne({
      $or: [{ rollNumber }, { email }]
    });
    
    if (existingStudent) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student already exists with this roll number or email' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      class: studentClass,
      rollNumber,
      email,
      phone,
      joinDate,
      address,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: {
          id: student._id,
          name: student.name,
          rollNumber: student.rollNumber,
          email: student.email,
          role: 'student'
        }
      }
    });
  } catch (error) {
    console.error('Student registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
};
