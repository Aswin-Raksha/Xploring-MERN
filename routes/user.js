const express = require('express');
const router = express.Router();
const User = require('../schema/User'); // Ensure the path is correct

// ✅ Add User
router.post('/addUser', async (req, res) => {
    try {
        const { name, city, age, email, password } = req.body;

        if (!name || !city || !age || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = new User({ name, city, age, email, password });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error saving user', error: error.message });
    }
});

// ✅ Get All Users
router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// ✅ Get User by ID
router.get('/getUser/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

// ✅ Update User
router.put('/updateUser/:id', async (req, res) => {
    try {
        const { name, city, age, email, password } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, city, age, email, password },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// ✅ Delete User
router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
});

module.exports = router;
