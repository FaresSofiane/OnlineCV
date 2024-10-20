const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé, aucun token fourni' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Utilisation de JWT_SECRET pour décoder le token
        req.user = decoded;  // Stocke les informations de l'utilisateur dans req.user
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Token invalide' });
    }
};