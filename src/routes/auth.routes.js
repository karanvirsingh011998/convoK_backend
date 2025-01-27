import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const router = express.Router();


// public routes

router.post('/login', login);
router.post('/register', register);

export default router; 