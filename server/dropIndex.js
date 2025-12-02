import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = `${process.env.MONGODB_URI}/EcoLearn`;

async function dropIndex() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const Teacher = mongoose.connection.collection('teachers');
    
    // List all indexes
    const indexes = await Teacher.indexes();
    console.log('Current indexes:', indexes);

    // Drop the username_1 index if it exists
    try {
      await Teacher.dropIndex('username_1');
      console.log('Dropped username_1 index successfully');
    } catch (err) {
      console.log('username_1 index does not exist or already dropped:', err.message);
    }

    // List indexes again
    const newIndexes = await Teacher.indexes();
    console.log('Updated indexes:', newIndexes);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

dropIndex();
