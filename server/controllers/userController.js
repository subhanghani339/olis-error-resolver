const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { id: 'asc' }
        });
        
        res.json({
            status: true,
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Failed to fetch users',
            data: null
        });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
        
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found',
                data: null
            });
        }
        
        res.json({
            status: true,
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Failed to fetch user',
            data: null
        });
    }
};

// Create new user
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        if (!name || !email) {
            return res.status(400).json({
                status: false,
                message: 'Name and email are required',
                data: null
            });
        }
        
        const user = await prisma.user.create({
            data: { name, email }
        });
        
        res.status(201).json({
            status: true,
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({
                status: false,
                message: 'Email already exists',
                data: null
            });
        }
        res.status(500).json({
            status: false,
            message: 'Failed to create user',
            data: null
        });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, email }
        });
        
        res.json({
            status: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                status: false,
                message: 'User not found',
                data: null
            });
        }
        if (error.code === 'P2002') {
            return res.status(400).json({
                status: false,
                message: 'Email already exists',
                data: null
            });
        }
        res.status(500).json({
            status: false,
            message: 'Failed to update user',
            data: null
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        await prisma.user.delete({
            where: { id: parseInt(id) }
        });
        
        res.json({
            status: true,
            message: 'User deleted successfully',
            data: null
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                status: false,
                message: 'User not found',
                data: null
            });
        }
        res.status(500).json({
            status: false,
            message: 'Failed to delete user',
            data: null
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
