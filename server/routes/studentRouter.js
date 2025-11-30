import express from 'express';
import { studentLogin, studentRegister } from '../controllers/studentController.js';

const studentRouter = express.Router();

// Student routes
studentRouter.post('/login', studentLogin);
studentRouter.post('/register', studentRegister);

export default studentRouter;