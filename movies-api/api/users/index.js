import express from 'express';
import User from './userModel';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'; // Ensure this package is installed

const router = express.Router();

// Get all users (for testing or admin purposes)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Failed to fetch users.' });
    }
});

// Register a new user
router.post('/register', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, msg: 'Username and password are required.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ success: false, msg: 'Username already exists.' });
    }

    await User.create({ username, password });
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}));

// Authenticate (Login) a user
router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = await User.findByUserName(username);
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Wrong password.' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, username: user.username });
}));

// Update a user
router.put('/:id', asyncHandler(async (req, res) => {
    const userId = req.params.id;

    if (req.body._id) delete req.body._id;

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ success: false, msg: 'Unable to update user.' });
    }

    res.status(200).json({ success: true, msg: 'User updated successfully.', user: updatedUser });
}));

export default router;
