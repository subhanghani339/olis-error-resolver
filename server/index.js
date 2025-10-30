const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

// Import routes
const userRoutes = require('./routes/userRoutes');
const resolutionTrackerRoutes = require('./routes/resolutionTrackerRoutes');
const authRoutes = require('./routes/authRoutes');


require('dotenv').config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log('>>> REQUEST:', req.method, req.url);
    next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resolutions', resolutionTrackerRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: true,
        message: 'Server is running successfully',
        data: {
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development'
        }
    });
});

// -------------------- SERVE REACT (PRODUCTION) --------------------
const buildPath = path.join(__dirname, '..', 'client', 'dist');

app.use(express.static(buildPath, { index: 'index.html' }));

app.use((req, res) => {
    const indexPath = path.join(buildPath, 'index.html');
    console.log('Attempting to serve:', indexPath);
    res.sendFile(indexPath, (err) => {
        if (err) console.error('Error serving file:', err);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Access from LAN at http://<SERVER_IP>:${PORT}`);
}
);

