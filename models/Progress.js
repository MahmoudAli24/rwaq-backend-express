const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    completedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    completedQuizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
    completedAssignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    progress: { type: Number, default: 0 },
});

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;
