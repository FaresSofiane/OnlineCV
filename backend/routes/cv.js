const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const CV = require('../models/CV');
const CVPersoContent = require('../models/CV_Perso_Content');
const CVExpPedago = require('../models/CV_Exp_Pedago');
const CVExpPro = require('../models/CV_Exp_Pro');
const User = require('../models/User');

// Créer un CV complet (perso, plusieurs exp pédagogiques, plusieurs exp professionnelles)
router.post('/cv', authMiddleware, async (req, res) => {
    const { user_id, private, persoContent, expPedago, expPro } = req.body;

    try {
        // Création du CV de base
        const newCV = new CV({ user_id, private });
        await newCV.save();

        // Ajout des informations personnelles
        const newPersoContent = new CVPersoContent({
            cv_id: newCV._id,
            nom: persoContent.nom,
            prenom: persoContent.prenom,
            date_naissance: persoContent.date_naissance,
            mail: persoContent.mail
        });
        await newPersoContent.save();

        // Ajout des expériences pédagogiques (plusieurs entrées possibles)
        for (const pedago of expPedago) {
            const newExpPedago = new CVExpPedago({
                cv_id: newCV._id,
                nom_diplome: pedago.nom_diplome,
                certificateur: pedago.certificateur,
                date: pedago.date,
                commentaire: pedago.commentaire
            });
            await newExpPedago.save();
        }

        // Ajout des expériences professionnelles (plusieurs entrées possibles)
        for (const pro of expPro) {
            const newExpPro = new CVExpPro({
                cv_id: newCV._id,
                nom_entreprise: pro.nom_entreprise,
                poste_occupe: pro.poste_occupe,
                date: pro.date,
                commentaire: pro.commentaire
            });
            await newExpPro.save();
        }

        res.status(201).json({ message: 'CV créé avec succès', cv: newCV });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erreur lors de la création du CV' });
    }
});

router.delete('/cv/:cv_id', authMiddleware, async (req, res) => {
    const { cv_id } = req.params;

    try {
        // Supprimer le CV
        await CV.findByIdAndDelete(cv_id);

        // Supprimer toutes les informations associées (informations personnelles, expériences pédagogiques et professionnelles)
        await CVPersoContent.deleteMany({ cv_id });
        await CVExpPedago.deleteMany({ cv_id });
        await CVExpPro.deleteMany({ cv_id });

        res.status(200).json({ message: 'CV supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du CV' });
    }
});

router.get('/cv/:cv_id', authMiddleware, async (req, res) => {
    const { cv_id } = req.params;

    try {
        // Récupérer le CV
        const cv = await CV.findById(cv_id);

        // Récupérer les informations personnelles
        const persoContent = await CVPersoContent.findOne({ cv_id });

        // Récupérer les expériences pédagogiques
        const expPedago = await CVExpPedago.find({ cv_id });

        // Récupérer les expériences professionnelles
        const expPro = await CVExpPro.find({ cv_id });

        res.status(200).json({ cv, persoContent, expPedago, expPro });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du CV' });
    }
});

router.get('/cvs', authMiddleware, async (req, res) => {
    const { user_id } = req.body;

    try {
        // Récupérer tous les CV de l'utilisateur
        const cvs = await CV.find({ private: false });

        console.log(cvs);
        const allCVsInfo = await Promise.all(cvs.map(async (cv) => {
            const cvId = cv._id;
            const persoContent = await CVPersoContent.findOne({ cv_id: cvId });
            const expPedago = await CVExpPedago.find({cv_id: cvId});
            const expPro = await CVExpPro.find({cv_id: cvId});
            const UserCV = await User.findById(cv.user_id);

            return {
                ...cv._doc,
                UserCV,
                persoContent,
                expPedago,
                expPro

            };
        }));


        console.log(cvs);
        res.status(200).json(allCVsInfo);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des CVs' });
    }

});

module.exports = router;