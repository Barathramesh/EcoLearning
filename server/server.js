import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import connectDB from './config/database.js';
import studentRoutes from './routes/studentRouter.js';
import teacherRouter from './routes/teacherRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads/assignments');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

await connectDB();

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased for base64 images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/teacher', teacherRouter);
app.use('/api/student', studentRoutes);
app.use('/api/assignment', assignmentRoutes);



app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
