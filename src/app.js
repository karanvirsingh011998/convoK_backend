import express from "express";
import cors from "cors";
import dbConnect from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const port = process.env.PORT || 3000;

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Body logging middleware for debugging
app.use((req, res, next) => {
    if (req.body) {
        console.log('Request body:', req.body);
    }
    next();
});

dbConnect();

app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app; 