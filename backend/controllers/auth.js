const UserModel = require('./../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Pour générer un token d'authentification

module.exports = {
    // POST /register : Création d'un nouvel utilisateur (ce que tu as déjà)
    register: async (req, res) => {
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
    },

    // POST /login : Authentification de l'utilisateur
    login: async (req, res) => {
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
                token: token
            });
        } catch (error) {
            res.status(500).send({ error: 'Erreur de serveur' });
        }
    }
}