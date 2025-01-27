import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            status: 401,
            error: 'Access denied',
            message: 'Invalid token',
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
            error: 'Invalid token',
            message: 'Invalid token'
        });
    }
}

export default verifyToken