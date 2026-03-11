const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const validator = require('validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// File upload configuration
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/car-builder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    carBuilds: [{
        name: String,
        carImage: String,
        selectedParts: [{
            id: String,
            name: String,
            price: Number,
            category: String,
            effects: Object
        }],
        totalCost: Number,
        finalStats: {
            hp: Number,
            torque: Number,
            weight: Number,
            camber: Number,
            height: String,
            topSpeed: Number
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// JWT middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Routes

// User Registration
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// Get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Save car build
app.post('/api/save-build', authenticateToken, async (req, res) => {
    try {
        const { name, carImage, carDetails, selectedParts, totalCost, finalStats } = req.body;

        if (!name || !carImage || !selectedParts || !finalStats) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newBuild = {
            name,
            carImage,
            carDetails: carDetails || {
                make: 'Unknown',
                model: 'Unknown',
                year: 'Unknown',
                color: 'Unknown'
            },
            selectedParts,
            totalCost,
            finalStats,
            createdAt: new Date()
        };

        user.carBuilds.push(newBuild);
        await user.save();

        res.status(201).json({
            message: 'Car build saved successfully',
            build: newBuild
        });
    } catch (error) {
        console.error('Save build error:', error);
        res.status(500).json({ error: 'Server error saving build' });
    }
});

// Get user's car builds
app.get('/api/my-builds', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('carBuilds');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ builds: user.carBuilds });
    } catch (error) {
        console.error('Get builds error:', error);
        res.status(500).json({ error: 'Server error fetching builds' });
    }
});

// Delete car build
app.delete('/api/build/:buildId', authenticateToken, async (req, res) => {
    try {
        const { buildId } = req.params;

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const buildIndex = user.carBuilds.findIndex(build => build._id.toString() === buildId);
        if (buildIndex === -1) {
            return res.status(404).json({ error: 'Build not found' });
        }

        user.carBuilds.splice(buildIndex, 1);
        await user.save();

        res.json({ message: 'Build deleted successfully' });
    } catch (error) {
        console.error('Delete build error:', error);
        res.status(500).json({ error: 'Server error deleting build' });
    }
});

// Get all public builds (for gallery)
app.get('/api/public-builds', async (req, res) => {
    try {
        const users = await User.find({}, 'username carBuilds').select('-password');
        const allBuilds = users.flatMap(user => 
            user.carBuilds.map(build => ({
                ...build.toObject(),
                username: user.username
            }))
        );

        res.json({ builds: allBuilds });
    } catch (error) {
        console.error('Get public builds error:', error);
        res.status(500).json({ error: 'Server error fetching public builds' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
