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
        message: 'Invalid username or password' 
      });
    }

    if (!student.credentialsGenerated || !student.passwordHash) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credentials not generated yet. Contact your teacher.' 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, student.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    // Clear plain password after first login
    if (student.plainPassword) {
      await Student.findByIdAndUpdate(student._id, { plainPassword: null });
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
          phone: student.phone,
          address: student.address,
          school: student.school,
          joiningDate: student.joiningDate,
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
