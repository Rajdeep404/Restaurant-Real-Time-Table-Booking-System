const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const session = require('express-session'); 
const dotenv = require('dotenv'); // <-- NEW: .env file support ke liye

// .env file se variables load karein
dotenv.config();

// Import Database Models
const Booking = require('./models/Booking'); 
// NOTE: User model ko auth_routes.js mein require kiya gaya hai

// Import Modular Routes
const adminRoutes = require('./admin_routes'); 
const authRoutes = require('./auth_routes'); 

const app = express();
const PORT = process.env.PORT || 3000;

// --- 1. MONGODB CONNECTION SETUP (Ab .env se uthayenge) ---
// Yahaan MONGODB_URI ab .env file se aayega
const MONGODB_URI = process.env.MONGODB_URI; 

mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ MongoDB se safaltapoorvak connect ho gaya! (.env se secured)'))
.catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); 
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// --- Session Middleware Setup (Ab .env se uthayenge) ---
app.use(session({
    // NEW: Secret key ab .env file se aayega
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 24 ghante
    }
}));

// Function to check if user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login/Login Animation/index.html');
    }
};

// --- ROUTES INTEGRATION ---
app.use('/', authRoutes); 
app.use('/admin', adminRoutes); 

// Static files and HTML routes 
app.use(express.static(path.join(__dirname, 'public')));

// Root route (Home Page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- Protect the Booking page ---
app.get('/booking.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'booking.html'));
});

// --- 4. BOOKING HANDLER ---
app.post('/submit-booking', async (req, res) => {
    const userEmail = req.session.email || req.body.email; 
    const { name, datetime, people, message } = req.body;

    if (!name || !userEmail || !datetime || !people) {
        return res.status(400).json({ success: false, message: "Booking ke liye zaruri fields missing hain." });
    }

    try {
        // Date validation check
        if (isNaN(new Date(datetime).getTime())) {
             return res.status(400).json({ success: false, message: "Invalid Date or Time format." });
        }
        
        const bookingDate = new Date(datetime);

        const newBooking = new Booking({
            name,
            email: userEmail,
            datetime: bookingDate,
            people: parseInt(people),
            message
        });

        await newBooking.save();
        
        console.log("Booking saved successfully to DB:", newBooking);
        
        res.status(201).json({ success: true, message: "Booking safaltapoorvak ho gayi! Aapka swagat hai." });
        
    } catch (err) {
        console.error("Booking DB Save Error:", err);
        res.status(500).json({ success: false, message: "Server error, booking submit nahi ho payi. Please check console for details." });
    }
});

// Server Start karein
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});