const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_SECRET || 'mysecret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';


const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    ACCESS_SECRET,
    { expiresIn: '1h' } // 1 hour
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    REFRESH_SECRET,
    { expiresIn: '7d' } // 7 days
  );

  return { accessToken, refreshToken };
};

// =====================
// REGISTER NEW USER
// =====================
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: 'Name, email and password are required',
                data: null
            });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: 'Email already exists',
                data: null
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });

        res.status(201).json({
            status: true,
            message: 'User registered successfully',
            data: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Failed to register user',
            data: null
        });
    }
};

// =====================
// LOGIN USER
// =====================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: 'Email and password are required',
                data: null
            });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: 'Invalid credentials',
                data: null
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: false,
                message: 'Invalid credentials',
                data: null
            });
        }

        const { accessToken, refreshToken } = generateTokens(user);
        
        res.json({
            status: true,
            message: 'Logged in successfully',
            data: { 
                id: user.id, 
                name: user.name, 
                email: user.email,
                accessToken,
                refreshToken,
            }
        });
    } catch (error) {
        console
        res.status(500).json({
            status: false,
            message: 'Login failed',
            data: null
        });
    }
};

// =====================
// LOGOUT USER
// =====================
const logout = (req, res) => {
    res.clearCookie('token');
    res.json({
        status: true,
        message: 'Logged out successfully',
        data: null
    });
};


// =====================
// REFRESH TOKEN
// =====================
const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      status: false,
      message: 'Refresh token required',
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: 'Invalid refresh token',
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    res.json({
      status: true,
      message: 'Token refreshed successfully',
      data: { accessToken, refreshToken: newRefreshToken },
    });
  } catch (err) {
    return res.status(403).json({
      status: false,
      message: 'Invalid or expired refresh token',
    });
  }
};

// =====================
// GET PROFILE (PROTECTED)
// =====================
const profile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found',
                data: null
            });
        }

        res.json({
            status: true,
            message: 'User profile retrieved successfully',
            data: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Failed to retrieve profile',
            data: null
        });
    }
};

module.exports = {
    register,
    login,
    logout,
    refresh,
    profile
};
