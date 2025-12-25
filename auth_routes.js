/**
 * Auth Routes
 * Yeh file saare user authentication (login, signup, logout) aur user-specific data logic ko handle karti hai.
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('./models/User'); // User Model import karein
const Booking = require('./models/Booking'); 

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        // Agar logged in nahi hai, toh 401 Unauthorised bhej do
        res.status(401).json({ success: false, message: "Aapko pehle login karna hoga." });
    }
};


// --- SIGNUP HANDLER ---
router.post('/signup', async (req, res) => {
    // NEW: Name field bhi le rahe hain
    const { email, password, name } = req.body; 

    if (!email || !password) {
        return res.status(400).send('<script>alert("Email aur password chahiye."); window.location.href="/login/Login Animation/index.html";</script>');
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).send('<script>alert("User pehle se maujood hai. Kripya login karein."); window.location.href="/login/Login Animation/index.html";</script>');
        }

        // User ko name ke saath save karein
        user = new User({ email, password, name: name || 'Guest User' });
        await user.save();

        res.status(201).send('<script>alert("Signup safal raha! Kripya login karein."); window.location.href="/login/Login Animation/index.html";</script>');

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).send('<script>alert("Server error, registration fail ho gaya."); window.location.href="/login/Login Animation/index.html";</script>');
    }
});

// --- LOGIN HANDLER (Session Set Hoga) ---
router.post('/login', async (req, res) => {
    const { email, password, admin } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            if (admin === 'true') {
                 return res.redirect('/admin/login?error=Invalid Credentials');
            }
            return res.status(401).send('<script>alert("Invalid credentials."); window.location.href="/login/Login Animation/index.html";</script>');
        }

        const isMatch = await user.comparePassword(password);

        if (isMatch) {
            // Session set karein
            req.session.userId = user._id;
            req.session.email = user.email;
            req.session.name = user.name; // NEW: Name session mein save ho gaya

            // Admin check
            if (email === 'admin@restoran.com') {
                return res.redirect('/admin/dashboard');
            }

            // Normal user login safal - Home page par redirect
            res.redirect('/');
        } else {
            // Password match nahi hua
            if (admin === 'true') {
                 return res.redirect('/admin/login?error=Invalid Password');
            }
            return res.status(401).send('<script>alert("Invalid credentials."); window.location.href="/login/Login Animation/index.html";</script>');
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send('<script>alert("Login failed due to server error."); window.location.href="/login/Login Animation/index.html";</script>');
    }
});

// --- LOGOUT HANDLER ---
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).send('<script>alert("Logout failed."); window.location.href="/";</script>');
        }
        res.send('<script>alert("Aap safaltapoorvak logout ho gaye hain!"); window.location.href="/login/Login Animation/index.html";</script>');
    });
});

// --- NEW: API to get User Name and Status ---
router.get('/user-info', (req, res) => {
    if (req.session.name) {
        // Agar user logged in hai, toh uska naam aur session status bhej do
        res.json({ 
            isLoggedIn: true, 
            name: req.session.name,
            authUrl: '/logout',
            authText: 'LOGOUT'
        });
    } else {
        // Agar logged in nahi hai
        res.json({
            isLoggedIn: false,
            name: 'Guest',
            authUrl: '/login/Login Animation/index.html',
            authText: 'LOGIN / SIGNUP'
        });
    }
});

// --- USER BOOKINGS API ---
router.get('/my-bookings-data', isAuthenticated, async (req, res) => {
    try {
        const userEmail = req.session.email; 

        if (!userEmail) {
            return res.status(401).json({ success: false, message: "Session mein email nahi mila." });
        }

        const bookings = await Booking.find({ email: userEmail }).sort({ datetime: -1 });

        res.json({ success: true, data: bookings, message: "Aapki bookings mil gayi." });

    } catch (err) {
        console.error("Error fetching user bookings:", err);
        res.status(500).json({ success: false, message: "Server se bookings data laane mein error." });
    }
});

module.exports = router;