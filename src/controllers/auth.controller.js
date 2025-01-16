import User from '../models/user.model.js';

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

        // Check if password matches
        if (user.password !== password) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid password"
            });
        }

        res.status(200).json({ 
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

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
        
        console.log('Registration attempt:', { username, email });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const user = new User({
            username,
            email,
            password 
        });

        const savedUser = await user.save();
        console.log('User saved successfully:', savedUser);

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