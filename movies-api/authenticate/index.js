import jwt from 'jsonwebtoken';
import User from '../api/users/userModel';

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: 'Bearer token not found' });
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        console.log('Decoded token:', decoded);

        const user = await User.findByUserName(decoded.username);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Authentication Error:', err.message);
        return res.status(401).json({ message: `Authentication failed: ${err.message}` });
    }
};

export default authenticate;
