import jwt from 'jsonwebtoken';
import { errorMessage } from '../utils/messages/errorMessages.js';
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Access denied',
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error({ error });
        res.status(401).json({
            status: 401,
            message: errorMessage.invalidToken
        });
    }
}

export default verifyToken