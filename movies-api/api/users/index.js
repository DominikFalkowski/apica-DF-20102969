import express from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from './userModel.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});


// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Authenticate (Login) a user
router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUserName(username);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, username: user.username });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during authentication' });
    }
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
