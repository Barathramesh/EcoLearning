import { validationResult } from 'express-validator';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';
import bcrypt from 'bcryptjs';


// Teacher Registration
export const teacherRegister = async (req, res) => {
  try {
    const { Name, email, phone, teacherId, password } = req.body;

    // Validate required fields
    if (!Name || !email || !phone || !teacherId || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: Name, email, phone, teacherId, password'
      });
    }

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ 
      $or: [{ teacherId }, { email }, { phone }] 
    });
    
    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: 'Teacher already exists with this ID, email, or phone'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create teacher
    const teacher = await Teacher.create({
      Name,
      email,
      phone,
      teacherId,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: 'Teacher registered successfully',
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

// Create Student
export const createStudent = async (req, res) => {
  try {
    const { name, email, studentId, password, teacherId } = req.body;

    if (!name || !email || !studentId || !password || !teacherId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const existingStudent = await Student.findOne({ 
      $or: [{ studentId }, { email }] 
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student already exists with this ID or email'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      studentId,
      password: hashedPassword,
      teacherId
    });

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Import Students from File
export const importStudentsFromFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { teacherId } = req.body;
    const fileContent = req.file.buffer.toString('utf-8');
    const lines = fileContent.split('\n').filter(line => line.trim());
    
    const students = [];
    for (let i = 1; i < lines.length; i++) { // Skip header
      const [name, email, studentId, password] = lines[i].split(',').map(s => s.trim());
      if (name && email && studentId && password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        students.push({ name, email, studentId, password: hashedPassword, teacherId });
      }
    }

    const result = await Student.insertMany(students, { ordered: false });

    res.status(201).json({
      success: true,
      message: `${result.length} students imported successfully`,
      data: result
    });
  } catch (error) {
    console.error('Import students error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during import'
    });
  }
};

// Get Students by Teacher
export const getStudentsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const students = await Student.find({ teacherId }).select('-password');

    res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Generate Credentials
export const generateCredentials = async (req, res) => {
  try {
    const { prefix = 'STU', count = 1 } = req.body;
    const credentials = [];

    for (let i = 0; i < count; i++) {
      const studentId = `${prefix}${Date.now()}${i}`;
      const password = Math.random().toString(36).slice(-8);
      credentials.push({ studentId, password });
    }

    res.status(200).json({
      success: true,
      data: credentials
    });
  } catch (error) {
    console.error('Generate credentials error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete Student
export const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const result = await Student.findByIdAndDelete(studentId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update Student
export const updateStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const student = await Student.findByIdAndUpdate(studentId, updates, { new: true }).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};