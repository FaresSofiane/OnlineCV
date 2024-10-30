
import  authMiddleware  from '../middleware/authMiddleware.js';
import  User  from '../models/User.js';
import  CV  from '../models/Cv.js';
import  CVPersoContent  from '../models/CV_Perso_Content.js';
import  CVExpPedago  from '../models/CV_Exp_Pedago.js';
import  CVExpPro  from '../models/CV_Exp_Pro.js';
import  Commentaire  from '../models/Commentaire.js';

import { Router } from "express";
const router = Router();

// Créer un CV complet (perso, plusieurs exp pédagogiques, plusieurs exp professionnelles)
router.post('/cv', authMiddleware, async (req, res) => {
    const { user_id, private_cv, persoContent, expPedago, expPro } = req.body;
    const userId = req.user.id; // Extract user id from req.user

    try {
        const user = await User.findOne({id: userId});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Création du CV de base
        const newCV = new CV({ user_id: user._id, private_cv });
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
        console.error(error);
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
    const userId = req.user.id; // Extract user id from req.user
    try {
        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Run calls in parallel
        const [cv, persoContent, expPedago, expPro, commentaires] = await Promise.all([
            CV.findById(cv_id),
            CVPersoContent.findOne({ cv_id }),
            CVExpPedago.find({ cv_id }),
            CVExpPro.find({ cv_id }),
            Commentaire.find({ cv_id })
        ]);

        if (!cv) {
            return res.status(404).json({ error: 'CV not found' });
        }

        // Get user information for each comment
        const commentairesWithUsernames = await Promise.all(commentaires.map(async (commentaire) => {
            const commentUser = await User.findById(commentaire.user_id);
            return {
                ...commentaire._doc, // Spread the original commentaire document
                username: commentUser ? commentUser.username : 'Unknown' // Add username
            };
        }));

        const isCreator = user._id.toString() === cv.user_id.toString();
        res.status(200).json({ cv, persoContent, expPedago, expPro, commentaires: commentairesWithUsernames, isCreator });
    } catch (error) {
        console.error('Error retrieving CV:', error);
        res.status(500).json({ error: 'Error retrieving CV' });
    }
});

router.get('/cvs', authMiddleware, async (req, res) => {
    const { user_id } = req.body;

    try {
        // Récupérer tous les CV de l'utilisateur
        const cvs = await CV.find({ private_cv: false });

        const allCVsInfo = await Promise.all(cvs.map(async (cv) => {
            const cvId = cv._id;
            const persoContent = await CVPersoContent.findOne({ cv_id: cvId });
            const expPedago = await CVExpPedago.find({ cv_id: cvId });
            const expPro = await CVExpPro.find({ cv_id: cvId });
            const UserCV = await User.findById(cv.user_id);
            const commentaires = await Commentaire.find({ cv_id: cvId });

            // Get user information for each comment
            const commentairesWithUsernames = await Promise.all(commentaires.map(async (commentaire) => {
                const commentUser = await User.findById(commentaire.user_id);
                return {
                    ...commentaire._doc, // Spread the original commentaire document
                    username: commentUser ? commentUser.username : 'Unknown' // Add username
                };
            }));

            return {
                ...cv._doc,
                UserCV,
                persoContent,
                expPedago,
                expPro,
                commentaires: commentairesWithUsernames
            };
        }));

        res.status(200).json(allCVsInfo);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des CVs' });
    }
});

router.get('/cv_of_user', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract user id from req.user

        // Use findOne instead of find
        const m_UserID = await User.findOne({ id: userId });

        if (!m_UserID) {
            return res.status(404).json({ message: "User not found" });
        }


        const cvs = await CV.find({ user_id: m_UserID._id });

        res.status(200).json({ cvs });
    } catch (error) {
        console.error('Error retrieving user CVs:', error);
        res.status(500).json({ message: "Error retrieving user CVs" }); // Consistent language
    }
});


router.put('/cv/:cv_id/section', authMiddleware, async (req, res) => {
    const { cv_id } = req.params;
    const { sectionType, sectionId, sectionData } = req.body;
    console.log('Received update request:', { cv_id, sectionType, sectionId, sectionData }); // Plus de détails dans le log

    try {
        let updatedSection;
        switch (sectionType) {
            case 'personalInfo':
                updatedSection = await CVPersoContent.findByIdAndUpdate(sectionId, sectionData, { new: true });
                console.log('Updating persoContent:', updatedSection); // Log de la section mise à jour
                break;
            case 'formation':
                updatedSection = await CVExpPedago.findByIdAndUpdate(sectionId, sectionData, { new: true });
                console.log('Updating expPedago:', updatedSection);
                break;
            case 'experience':
                updatedSection = await CVExpPro.findByIdAndUpdate(sectionId, sectionData, { new: true });
                console.log('Updating expPro:', updatedSection);
                break;
            default:
                console.log('Invalid section type'); // Log si le type de section est incorrect
                return res.status(400).json({ error: 'Invalid section type' });
        }
        if (!updatedSection) {
            console.log('Section not found:', sectionId); // Log si la section n'est pas trouvée
            return res.status(404).json({ error: 'Section not found' });
        }
        res.status(200).json({ message: 'Section updated successfully', updatedSection });
    } catch (error) {
        console.error('Error updating the section:', error); // Log de l'erreur
        res.status(500).json({ error: 'Error updating the section' });
    }
});

// Route pour ajouter une rubrique dans un CV
router.post('/cv/:cv_id/section', authMiddleware, async (req, res) => {
    const { cv_id } = req.params;
    const { sectionType, sectionData } = req.body; // sectionType: 'persoContent', 'expPedago', 'expPro'
    try {
        let newSection;
        switch (sectionType) {
            case 'persoContent':
                newSection = new CVPersoContent({ cv_id, ...sectionData });
                break;
            case 'expPedago':
                newSection = new CVExpPedago({ cv_id, ...sectionData });
                break;
            case 'expPro':
                newSection = new CVExpPro({ cv_id, ...sectionData });
                break;
            default:
                return res.status(400).json({ error: 'Invalid section type' });
        }

        await newSection.save();
        res.status(201).json({ message: 'Section added successfully', newSection });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding the section' });
    }
});

// Route pour supprimer une rubrique dans un CV
router.delete('/cv/:cv_id/section', authMiddleware, async (req, res) => {
    const { cv_id } = req.params;
    const { sectionType, sectionId } = req.body; // sectionType: 'persoContent', 'expPedago', 'expPro'
    console.log('Received delete request:', { cv_id, sectionType, sectionId });
    try {
        let deletedSection;
        switch (sectionType) {

            case 'formation':
                deletedSection = await CVExpPedago.findByIdAndDelete(sectionId);
                break;
            case 'experience':
                deletedSection = await CVExpPro.findByIdAndDelete(sectionId);
                break;
            default:
                return res.status(400).json({ error: 'Invalid section type' });
        }

        if (!deletedSection) {
            return res.status(404).json({ error: 'Section not found' });
        }
        res.status(200).json({ message: 'Section deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting the section' });
    }
});

router.put('/cv/:cv_id/privacy', authMiddleware, async (req, res) => {
    const { cv_id } = req.params;
    const { private_cvStatus } = req.body;

    console.log(cv_id, private_cvStatus);

    try {
        const updatedCV = await CV.findByIdAndUpdate({_id : cv_id}, { private_cv: private_cvStatus }, { new: true });

        if (!updatedCV) {
            return res.status(404).json({ error: 'CV not found' });
        }

        res.status(200).json({ message: 'CV privacy updated successfully', cv: updatedCV });
    } catch (error) {
        console.error('Error updating CV privacy:', error);
        res.status(500).json({ error: 'Error updating CV privacy' });
    }
});

router.get('/cv/:cv_id/commentaires', authMiddleware, async (req, res) => {
    const { cv_id } = req.params;

    try {
        const commentaires = await Commentaire.find({ cv_id }).populate('user_id', 'name');
        if (!commentaires.length) {
            return res.status(404).json({ message: 'Aucun commentaire trouvé pour ce CV' });
        }

        res.status(200).json({ commentaires });
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
    }
});

router.post('/cv/:cv_id/commentaires', authMiddleware, async (req, res) => {
    const { cv_id } = req.params;
    const { content } = req.body;
    const userId = req.user.id; // Extract user ID from req.user

    const user = await User.findOne({ id: userId });


    try {
        const newCommentaire = new Commentaire({
            cv_id,
            user_id: user._id,
            content
        });

        await newCommentaire.save();

        res.status(201).json({ message: 'Commentaire ajouté avec succès', commentaire: newCommentaire });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout du commentaire' });
    }
});

export default router;