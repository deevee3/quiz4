const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// MongoDB connection
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// MongoDB Schemas
const ResultSchema = new mongoose.Schema({
    answers: [String],
    score: Number,
    result: String,
    analysis: String,
    timestamp: { type: Date, default: Date.now }
});

const ContactSchema = new mongoose.Schema({
    email: String,
    timestamp: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', ResultSchema);
const Contact = mongoose.model('Contact', ContactSchema);

// API Routes
app.post('/api/quiz-results', async (req, res) => {
    try {
        const result = new Result(req.body);
        await result.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving results:', error);
        res.status(500).json({ error: 'Failed to save results' });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'Failed to save contact' });
    }
});

// Connect to MongoDB and start server
connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});