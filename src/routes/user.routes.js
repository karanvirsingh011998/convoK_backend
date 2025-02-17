import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { deleteUser, getUserById,updateUser } from '../controllers/user.controller.js';

const protectedRouter = express.Router();

protectedRouter.get('/user/:id', verifyToken, getUserById);

protectedRouter.put('/user/:id', verifyToken, updateUser);

protectedRouter.delete('/user/:id', verifyToken, deleteUser);

export default protectedRouter; 
