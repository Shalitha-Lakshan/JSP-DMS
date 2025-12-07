const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...'.yellow);
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
        console.log(`Database: ${conn.connection.db.databaseName}`.cyan);
        
        // Log connection events
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to DB'.green);
        });

        mongoose.connection.on('error', (err) => {
            console.error(`Mongoose connection error: ${err.message}`.red);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected'.yellow);
        });
        
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`.red.bold);
        console.error('Connection URI:', process.env.MONGO_URI ? 'Found' : 'Missing');
        process.exit(1);
    }
};

module.exports = connectDB;
