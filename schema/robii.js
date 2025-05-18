const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollno: {
        type: Number, // Change to String if roll numbers contain leading zeros
        required: true
    },
    department: {
        type: String,
        required: true
    },
    year: {  // Changed from "Year" to "year" for consistency
        type: Number,
        required: true
    },
    cgpa: {  // Changed from "CGPA" to "cgpa"
        type: Number,
        required: true
    },
    backlogs: {  // Changed from "Backlogs" to "backlogs"
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
