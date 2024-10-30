// Importations des modules nécessaires
import express from 'express';
import User from '../models/User.js';
import CV from '../models/Cv.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour obtenir les CVs publics
router.get('/cvs/public', authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        const usersWithPublicCVs = await Promise.all(users.map(async user => {
            const publicCVs = await CV.find({ user_id: user._id, private_cv: false });
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

// Exportation du routeur
export default router;