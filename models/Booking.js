const mongoose = require('mongoose');

// Booking Schema Define karna
const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    datetime: {
        type: Date, // Date format mein store hoga
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        default: ''
    },
    // --- NEW: Status field added ---
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'], // Sirf ye teen values allowed hain
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now // Booking kab hui, uska time
    }
});

// Model ko export karne ka theek tarika
module.exports = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);