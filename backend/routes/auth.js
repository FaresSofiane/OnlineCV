// Importation des modules avec syntaxe ES6
import { Router } from 'express';
import * as autController from './../controllers/auth.js';

const router = Router();

// Création d'un nouvel utilisateur
router.post('/register', autController.register);

// Authentification de l'utilisateur
router.post('/login', autController.login);

// Exportation du module avec syntaxe ES6
export default router;