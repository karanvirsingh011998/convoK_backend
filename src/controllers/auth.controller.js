import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { saltRounds } from '../utils/constant.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // If user doesn't exist
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1d',
        });
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                res.status(200).json({
                    success: true,
                    token: token,
                    message: "Login successful",
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: "Paswword does not match",
                    error: res.message
                });
            }
        })
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        // hash password
        let hashPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            username,
            email,
            password: hashPassword
        });

        const savedUser = await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}; 