import mongoose from 'mongoose';

const syllabusSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  grade: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  topics: [{
    topicName: String,
    description: String,
    duration: String
  }],
  generatedPrompt: {
    type: String
  },
  videoGenerationStatus: {
    type: String,
    enum: ['pending', 'generating', 'completed', 'failed'],
    default: 'pending'
  },
  videoUrl: {
    type: String
  },
  videoTaskId: {
    type: String
  },
  thumbnailUrl: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

syllabusSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Syllabus = mongoose.model('Syllabus', syllabusSchema);

export default Syllabus;
