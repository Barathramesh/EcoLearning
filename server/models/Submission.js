import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  studentRollNumber: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  files: [{
    fileName: String,
    fileUrl: String,
    fileType: String,
    fileSize: Number
  }],
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['submitted', 'graded', 'late', 'ai-graded', 'pending-review'],
    default: 'submitted'
  },
  grade: {
    type: String,
    default: ''
  },
  score: {
    type: Number,
    default: null
  },
  feedback: {
    type: String,
    default: ''
  },
  gradedAt: {
    type: Date,
    default: null
  },
  gradedBy: {
    type: String,
    default: ''
  },
  // AI Grading Results
  aiGrading: {
    isGraded: { type: Boolean, default: false },
    gradedAt: { type: Date },
    // Scores breakdown
    scores: {
      uniqueness: { type: Number, default: 0 },       // How original is the content
      contentAccuracy: { type: Number, default: 0 },  // How accurate compared to expected answer
      relevance: { type: Number, default: 0 },        // How relevant to the topic
      quality: { type: Number, default: 0 },          // Grammar, clarity, structure
      overall: { type: Number, default: 0 }           // Weighted total score
    },
    // Detailed analysis
    analysis: {
      keyPointsCovered: [{ type: String }],           // Which key points were addressed
      keyPointsMissing: [{ type: String }],           // Which key points were missed
      strengths: [{ type: String }],
      improvements: [{ type: String }],
      similarityToExpected: { type: Number, default: 0 }  // % match to expected answer
    },
    // Flags for teacher review
    flags: [{
      type: { type: String },
      severity: { type: String, enum: ['low', 'medium', 'high', 'critical'] },
      message: { type: String }
    }],
    // AI-generated feedback for student
    studentFeedback: { type: String, default: '' },
    // Detailed report for teacher
    teacherReport: { type: String, default: '' },
    // Confidence level of AI grading
    confidence: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Index for faster queries
submissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });
submissionSchema.index({ studentId: 1, status: 1 });

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
