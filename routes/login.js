const express = require('express');
const router = express.Router();
const Login = require('../schema/login'); // Using Login schema

// ✅ User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await Login.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // ✅ Compare password using method from login schema
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

module.exports = router;
