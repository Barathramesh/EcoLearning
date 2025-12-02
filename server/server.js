import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/database.js';
import studentRoutes from './routes/studentRouter.js';
import teacherRouter from './routes/teacherRoutes.js';
import classRouter from './routes/classRoutes.js';
import assignmentRouter from './routes/assignmentRoutes.js';
import submissionRouter from './routes/submissionRoutes.js';
import aiChatRouter from './routes/aiChatRoutes.js';

const app = express();
const port = process.env.PORT;

await connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/teacher', teacherRouter);
app.use('/api/student', studentRoutes);
app.use('/api/class', classRouter);
app.use('/api/assignment', assignmentRouter);
app.use('/api/submission', submissionRouter);
app.use('/api/ai-chat', aiChatRouter);



app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
