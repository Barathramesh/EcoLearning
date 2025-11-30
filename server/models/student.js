import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  // schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
  joinDate: { type: Date },
  password: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // teacher who created/owns student
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
