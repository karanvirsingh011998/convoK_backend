import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import User from '../models/user.model.js';

const protectedRouter = express.Router();

// protected routes
protectedRouter.get('/', verifyToken, async (req, res) => {
    const users  = await User.find({})
    res.status(200).json({ message: 'Protected route accessed', data: users });
});

export default protectedRouter; 