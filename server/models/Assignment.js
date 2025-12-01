import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  // Student who submitted
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },
  
  // Assignment details
  title: { 
    type: String, 
    required: true 
  },
  subject: { 
    type: String, 
    required: true 
  },
  topic: {
    type: String,
    required: true
  },
  description: { 
    type: String, 
    required: true 
  },
  
  // File information
  files: [{
    fileName: String,
    filePath: String,
    fileType: String, // 'pdf', 'image', 'doc', etc.
    fileSize: Number,
    extractedText: String, // OCR extracted text for images
    uploadedAt: { type: Date, default: Date.now }
  }],
  
  // AI Verification Results
  aiVerification: {
    isVerified: { type: Boolean, default: false },
    verifiedAt: Date,
    
    // Topic Relevance Check
    topicRelevance: {
      score: { type: Number, min: 0, max: 100 }, // Percentage of relevance
      isRelevant: Boolean,
      feedback: String,
      keyTopicsFound: [String],
      missingTopics: [String]
    },
    
    // Plagiarism Detection
    plagiarismCheck: {
      score: { type: Number, min: 0, max: 100 }, // Percentage of plagiarism
      isPlagiarized: Boolean, // true if score > 30%
      suspiciousSegments: [{
        text: String,
        similarity: Number,
        source: String
      }],
      feedback: String
    },
    
    // Content Quality Analysis
    contentQuality: {
      score: { type: Number, min: 0, max: 100 },
      grammar: { type: Number, min: 0, max: 100 },
      clarity: { type: Number, min: 0, max: 100 },
      depth: { type: Number, min: 0, max: 100 },
      structure: { type: Number, min: 0, max: 100 },
      feedback: String
    },
    
    // AI-generated content detection
    aiContentDetection: {
      score: { type: Number, min: 0, max: 100 }, // Probability of AI-generated
      isAIGenerated: Boolean,
      feedback: String
    },
    
    // Overall Assessment
    overallAssessment: {
      totalScore: { type: Number, min: 0, max: 100 },
      grade: String, // A+, A, B+, B, C+, C, D, F
      passed: Boolean,
      detailedFeedback: String,
      strengths: [String],
      areasForImprovement: [String]
    }
  },
  
  // Manual review by teacher (optional override)
  teacherReview: {
    isReviewed: { type: Boolean, default: false },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    reviewedAt: Date,
    manualGrade: String,
    manualScore: Number,
    teacherFeedback: String,
    overrideAI: { type: Boolean, default: false }
  },
  
  // Final grade (AI or teacher override)
  finalGrade: {
    score: Number,
    grade: String,
    gradedBy: { type: String, enum: ['AI', 'Teacher'], default: 'AI' }
  },
  
  // Status
  status: { 
    type: String, 
    enum: ['submitted', 'processing', 'verified', 'flagged', 'graded', 'reviewed'],
    default: 'submitted'
  },
  
  // Flags
  flags: [{
    type: { type: String, enum: ['plagiarism', 'ai_content', 'off_topic', 'low_quality'] },
    severity: { type: String, enum: ['low', 'medium', 'high', 'critical'] },
    message: String,
    createdAt: { type: Date, default: Date.now }
  }],
  
  dueDate: Date,
  submittedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Index for faster queries
assignmentSchema.index({ studentId: 1, status: 1 });
assignmentSchema.index({ subject: 1, topic: 1 });
assignmentSchema.index({ 'aiVerification.plagiarismCheck.isPlagiarized': 1 });

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
