import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoUri=process.env.MONGO_URI;
      await mongoose.connect(mongoUri!, {
        dbName: 'ecommerce'
      });
      console.log('\x1b[35mMongoDB connected via Mongoose\x1b[0m');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
}

export default connectDB;