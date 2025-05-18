const express = require('express');
const router = express.Router();
const User = require('../schema/User');

// Add User
router.post('/addUser', async (req, res) => {
    try {
        const { name, rollno, department, year, cgpa, backlogs, password } = req.body;

        // Check if roll number already exists
        const existingUser = await User.findOne({ rollno });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this roll number already exists' });
        }

        const newUser = new User({ name, rollno, department, year, cgpa, backlogs, password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error saving user', error: error.message });
    }
});

// Get User by ID
router.get('/getUser/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

// Update User
router.put('/updateUser/:id', async (req, res) => {
    try {
        const { name, rollno, department, year, cgpa, backlogs, password } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update fields
        user.name = name || user.name;
        user.rollno = rollno || user.rollno;
        user.department = department || user.department;
        user.year = year || user.year;
        user.cgpa = cgpa || user.cgpa;
        user.backlogs = backlogs || user.backlogs;
        if (password) user.password = password; // Auto-hashed in schema middleware

        await user.save();
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// Delete User
router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

module.exports = router;
