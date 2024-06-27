const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    submissions: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        fileUrl: {
            type: String,
            required: true,
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
        grade: {
            type: Number,
            required: false,
        },
        feedback: {
            type: String,
            required: false,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
