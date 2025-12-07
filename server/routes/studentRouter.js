import express from "express";
import {
  studentLogin,
  changePassword,
  awardVideoPoints,
  awardQuizPoints,
  getStudentStats,
} from "../controllers/studentController.js";

const studentRouter = express.Router();

// Student authentication
studentRouter.post("/login", studentLogin);
studentRouter.post("/change-password", changePassword);

// Points and stats
studentRouter.post("/award-video-points", awardVideoPoints);
studentRouter.post("/award-quiz-points", awardQuizPoints);
studentRouter.get("/stats/:studentId", getStudentStats);

export default studentRouter;
