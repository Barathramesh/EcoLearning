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

    // Check if this is first login (need to change password)
    const isFirstLogin = student.isFirstLogin !== false;

    res.status(200).json({
      success: true,
      message: isFirstLogin ? 'First login - password change required' : 'Login successful',
      data: {
        user: {
          id: student._id,
          name: student.name,
          rollNumber: student.rollNumber,
          email: student.email,
          phone: student.phone,
          address: student.address,
          school: student.school,
          class: student.class,
          joiningDate: student.joiningDate,
          role: 'student',
          isFirstLogin: isFirstLogin
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

// Change password for first login
export const changePassword = async (req, res) => {
  try {
    const { rollNumber, oldPassword, newPassword } = req.body;

    if (!rollNumber || !oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Roll number, old password, and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    const student = await Student.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Verify old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, student.passwordHash);
    if (!isOldPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    // Update password and clear first login flag
    await Student.findByIdAndUpdate(student._id, {
      passwordHash: newPasswordHash,
      plainPassword: null,
      isFirstLogin: false
    });

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
      data: {
        user: {
          id: student._id,
          name: student.name,
          rollNumber: student.rollNumber,
          email: student.email,
          phone: student.phone,
          address: student.address,
          school: student.school,
          class: student.class,
          joiningDate: student.joiningDate,
          role: 'student',
          isFirstLogin: false
        }
      }
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password change'
    });
  }
};
