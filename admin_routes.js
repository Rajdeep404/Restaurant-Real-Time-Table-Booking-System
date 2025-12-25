/**
 * Admin Panel Routes
 * Yeh file saare admin se related logic ko handle karti hai.
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const Booking = require('./models/Booking'); // Booking Model import karein

// --- ADMIN AUTH MIDDLEWARE ---
const isAdmin = (req, res, next) => {
    if (req.session.userId && req.session.email === 'admin@restoran.com') {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'public', 'admin_login.html')); 
    }
};

// --- ROUTES ---

// 1. Admin Login Page Render karna
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin_login.html'));
});

// 2. Admin Dashboard - Booking List
router.get('/dashboard', isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// 3. API Route: Database se saari bookings laana
router.get('/bookings-data', isAdmin, async (req, res) => {
    try {
        // Status field ab automatically included hoga
        const bookings = await Booking.find().sort({ datetime: -1 }); 
        res.json({ success: true, data: bookings });
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ success: false, message: "Server se bookings data laane mein error." });
    }
});

// --- NEW: API Route for Status Update ---
router.post('/update-status', isAdmin, async (req, res) => {
    const { bookingId, newStatus } = req.body;
    
    if (!bookingId || !['Confirmed', 'Cancelled'].includes(newStatus)) {
        return res.status(400).json({ success: false, message: "Invalid data." });
    }

    try {
        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { status: newStatus },
            { new: true } // Updated document return karein
        );

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking nahi mili." });
        }

        res.json({ success: true, message: `Booking ID ${bookingId} ${newStatus} ho gayi.`, booking });
    } catch (err) {
        console.error("Status update error:", err);
        res.status(500).json({ success: false, message: "Server error, status update nahi ho paya." });
    }
});


// Admin routes ko 'router' se export karein
module.exports = router;