import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
}, {
  timestamps: true
});

// // Remove password from JSON response
// teacherSchema.methods.toJSON = function() {
//   const teacher = this.toObject();
//   delete teacher.password;
//   return teacher;
// };

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
