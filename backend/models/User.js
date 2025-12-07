const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    // Auto-generated from email
    username: {
        type: String,
        unique: true,
        trim: true,
        maxlength: [50, 'Username cannot be more than 50 characters'],
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    firstName: {
        type: String,
        required: [true, 'Please add your first name'],
        trim: true,
        maxlength: [50, 'First name cannot be more than 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Please add your last name'],
        trim: true,
        maxlength: [50, 'Last name cannot be more than 50 characters']
    },
    fullName: {
        type: String,
        trim: true,
        maxlength: [100, 'Full name cannot be more than 100 characters']
    },
    company: {
        type: String,
        trim: true,
        maxlength: [100, 'Company name cannot be longer than 100 characters'],
        default: ''
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        trim: true,
        maxlength: [20, 'Phone number cannot be longer than 20 characters']
    },
    // Optional address fields
    address: {
        street: { 
            type: String, 
            trim: true,
            default: '' 
        },
        city: { 
            type: String, 
            trim: true,
            default: '' 
        },
        state: { 
            type: String, 
            trim: true,
            default: '' 
        },
        zipCode: { 
            type: String, 
            trim: true,
            default: '' 
        },
        country: { 
            type: String, 
            trim: true,
            default: '' 
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'collector', 'processor'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    acceptTerms: {
        type: Boolean,
        default: false,
        required: [true, 'You must accept the terms and conditions']
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpire: {
        type: Date,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
