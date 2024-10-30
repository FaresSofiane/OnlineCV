import UserModel from './../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyUser } from "../validator/user.js";

export const register = async (req, res) => {
    try {
        verifyUser(req.body);
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).send({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

export const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        // Vérification si l'utilisateur existe
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'Utilisateur non trouvé' });
        }
        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ error: 'Mot de passe incorrect' });
        }
        // Génération d'un token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Envoi de la réponse avec le token
        res.send({
            message: 'Connexion réussie',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erreur de serveur' });
    }
};