const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log('>>> REQUEST:', req.method, req.url);
    next();
});

// Example API: Get all users
app.get('/api/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// Example API: Create user
app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({ data: { name, email } });
    res.json(user);
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

