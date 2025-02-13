import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        regexp: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User; 