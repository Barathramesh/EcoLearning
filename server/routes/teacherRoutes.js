import express from 'express';
import multer from 'multer';
import { 
  teacherLogin, 
  teacherRegister,
  createStudent, 
  importStudentsFromFile, 
  getStudentsByTeacher, 
  generateCredentials,
  deleteStudent,
  updateStudent
} from '../controllers/teacherController.js';

const teacherRouter = express.Router();

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Teacher routes
teacherRouter.post('/login', teacherLogin);
teacherRouter.post('/register', teacherRegister);

// Teacher manages students
teacherRouter.post('/create-students', createStudent);
teacherRouter.post('/import-students-file', upload.single('file'), importStudentsFromFile);
teacherRouter.get('/students/:teacherId', getStudentsByTeacher);
teacherRouter.post('/generate-credentials', generateCredentials);
teacherRouter.delete('/students/:studentId', deleteStudent);
teacherRouter.put('/students/:studentId', updateStudent);

export default teacherRouter;