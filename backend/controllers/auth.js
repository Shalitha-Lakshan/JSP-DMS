const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    console.log('Registration request received:', req.body);
    
    const { 
        firstName,
        lastName,
        email, 
        password,
        confirmPassword,
        company,
        phone,
        acceptTerms
    } = req.body;

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'phone'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
        return next(new ErrorResponse(`Please provide ${missingFields.join(', ')}`, 400));
    }

    if (!acceptTerms) {
        return next(new ErrorResponse('You must accept the terms and conditions', 400));
    }

    if (password !== confirmPassword) {
        return next(new ErrorResponse('Passwords do not match', 400));
    }

    try {
        console.log('Checking for existing user...');
        // Create username from email before checking
        const username = email.split('@')[0];
        
        // Check if user exists with email or username
        const existingUser = await User.findOne({ 
            $or: [
                { email: email.toLowerCase().trim() },
                { username: username.toLowerCase().trim() }
            ] 
        });

        if (existingUser) {
            console.log('User already exists:', { email, username });
            return next(
                new ErrorResponse('User already exists with this email or username', 400)
            );
        }

        console.log('Creating new user...');
        
        // Create new user with all required fields
        const user = await User.create({
            username: username.toLowerCase().trim(),
            email: email.toLowerCase().trim(),
            password,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            fullName: `${firstName.trim()} ${lastName.trim()}`,
            phone: phone.trim(),
            company: company ? company.trim() : '',
            address: {
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: ''
            },
            role: 'user',
            isActive: true,
            acceptTerms: true
        });

        console.log('User created successfully:', { 
            userId: user._id, 
            email: user.email,
            username: user.username 
        });
        
        sendTokenResponse(user, 201, res);
    } catch (err) {
        console.error('Registration error:', {
            name: err.name,
            message: err.message,
            code: err.code,
            errors: err.errors
        });
        next(err);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    const { login, password } = req.body;

    // Validate login and password
    if (!login || !password) {
        return next(new ErrorResponse('Please provide login credentials', 400));
    }

    try {
        // Check for user by email or username
        const user = await User.findOne({
            $or: [
                { email: login },
                { username: login }
            ]
        }).select('+password');

        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        // Check if user is active
        if (!user.isActive) {
            return next(new ErrorResponse('Account is deactivated', 401));
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    });
};

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
};

// @desc    Get current user
// @route   GET /api/auth/current-user
// @access  Private
exports.getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
};
