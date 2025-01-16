import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
    try {
        const connectionString = process.env.MONGO_URI;
        console.log('Attempting to connect to MongoDB...');
        
        if (!connectionString) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        await mongoose.connect(connectionString);
        console.log('MongoDB connected successfully');
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
        
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default dbConnect; 