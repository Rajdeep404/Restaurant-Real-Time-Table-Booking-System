const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

// 1. User Schema Define karna
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    // --- NEW: Name field added ---
    name: {
        type: String,
        required: false, 
        default: 'Guest User'
    }
}, { timestamps: true });

// 2. Password ko Save karne se pehle Hash karna (Security Step)
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 3. Login ke dauran Password Compare karne ke liye method
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Model ko export karne ka theek tarika
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);