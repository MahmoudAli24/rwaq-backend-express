const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
 title: { type: String, required: true },
 description: { type: String, required: true },
 category: { type: String, required: true },
 teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
 quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
 assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
 ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
