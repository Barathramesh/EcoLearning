import mongoose from 'mongoose';
import 'dotenv/config';
import Admin from './models/Admin.js';
import connectDB from './config/database.js';

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ adminId: 'admin001' });
    
    if (existingAdmin) {
      console.log('Admin already exists:');
      console.log({
        name: existingAdmin.name,
        adminId: existingAdmin.adminId,
        schoolName: existingAdmin.schoolName
      });
      process.exit(0);
    }

    // Create default admin
    const defaultAdmin = new Admin({
      name: 'EcoLearn Admin',
      adminId: 'admin001',
      password: 'admin123', // Plain password as requested
      schoolName: 'EcoLearn Academy'
    });

    await defaultAdmin.save();

    console.log('Default admin created successfully:');
    console.log({
      name: defaultAdmin.name,
      adminId: defaultAdmin.adminId,
      password: 'admin123',
      schoolName: defaultAdmin.schoolName
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
