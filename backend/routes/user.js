const express = require('express');
const router = express.Router();
const User = require('../models/User');
const CV = require('../models/CV.js');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/cvs/public', authMiddleware, async (req, res) => {
    try {
        const users = await User.find();

        const usersWithPublicCVs = await Promise.all(users.map(async user => {
            const publicCVs = await CV.find({ user_id: user._id, private: false });

            return {
                username: user.username,
                email: user.email,
                cvs: publicCVs
            };
        }));

        res.status(200).json(usersWithPublicCVs);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs et de leurs CVs publics' });
    }
});

module.exports = router;