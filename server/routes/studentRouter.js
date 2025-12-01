import express from 'express';
import { studentLogin } from '../controllers/studentController.js';

const studentRouter = express.Router();

// Student authentication
studentRouter.post('/login', studentLogin);
// studentRouter.post('/register', studentRe);

export default studentRouter;