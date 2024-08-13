import mongoose from 'mongoose';

const vastDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://ninja:ninja@cluster0.m0kr1cn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    });
    console.log('db connection successfully');
  } catch (error) {
    console.error('DB connection error:', error.message);
    process.exit(1);
  }
};

export default vastDb;
