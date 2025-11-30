import express from 'express';
import { teacherLogin, teacherRegister } from '../controllers/teacherController.js';

const teacherRouter = express.Router();

// Teacher routes
teacherRouter.post('/login', teacherLogin);
teacherRouter.post('/register', teacherRegister);

export default teacherRouter;