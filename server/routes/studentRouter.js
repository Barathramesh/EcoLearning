import express from 'express';
import { studentLogin, changePassword } from '../controllers/studentController.js';

const studentRouter = express.Router();

// Student authentication
studentRouter.post('/login', studentLogin);
studentRouter.post('/change-password', changePassword);
// studentRouter.post('/register', studentRe);

export default studentRouter;