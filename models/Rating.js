const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: false },
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
