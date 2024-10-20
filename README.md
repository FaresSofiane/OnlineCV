# OnlineCV

## Description de l'application

OnlineCV est une application web qui permet aux utilisateurs de créer, visualiser et gérer leurs CV en ligne. L'application offre des fonctionnalités telles que l'inscription, la connexion, la création de CV avec des informations personnelles, des expériences pédagogiques et professionnelles, ainsi que la possibilité de rendre les CV publics ou privés.

## Instructions pour lancer le projet en local

### Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

### Installation

1. Clonez le dépôt du projet :

   ```bash
   git clone https://github.com/FaresSofiane/OnlineCV.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd OnlineCV
   ```

3. Installez les dépendances pour le frontend :

   ```bash
   cd onlinecv
   npm install
   ```

4. Installez les dépendances pour le backend :

   ```bash
   cd ../backend
   npm install
   ```

### Lancement du projet

1. Démarrez le serveur backend :

   ```bash
   npm run start-local
   ```

2. Démarrez le serveur frontend :

   ```bash
   cd ../onlinecv
   npm run dev
   ```

3. Accédez à l'application via votre navigateur à l'adresse `http://localhost:3000`.

## Description des endpoints

### Authentification

- **POST /api/auth/register** : Crée un nouvel utilisateur.

  - Corps de la requête : `{ "username": "string", "email": "string", "password": "string" }`
  - Réponse : `{ "id": "string", "username": "string", "email": "string" }`
  - Code source :
    ```javascript:OnlineCV/backend/routes/auth.js
    startLine: 5
    endLine: 5
    ```

- **POST /api/auth/login** : Authentifie un utilisateur.
  - Corps de la requête : `{ "email": "string", "password": "string" }`
  - Réponse : `{ "message": "string", "token": "string", "user": { "id": "string", "username": "string", "email": "string" } }`
  - Code source :
    ```javascript:OnlineCV/backend/routes/auth.js
    startLine: 8
    endLine: 8
    ```

### CV

- **POST /api/cv/cv** : Crée un CV complet.

  - Corps de la requête : `{ "user_id": "string", "private": "boolean", "persoContent": { "nom": "string", "prenom": "string", "date_naissance": "date", "mail": "string" }, "expPedago": [ ... ], "expPro": [ ... ] }`
  - Réponse : `{ "message": "CV créé avec succès", "cv": "object" }`
  - Code source :
    ```javascript:OnlineCV/backend/routes/cv.js
    startLine: 12
    endLine: 66
    ```

- **DELETE /api/cv/:cv_id** : Supprime un CV.

  - Réponse : `{ "message": "CV supprimé avec succès" }`
  - Code source :
    ```javascript:OnlineCV/backend/routes/cv.js
    startLine: 67
    endLine: 83
    ```

- **GET /api/cv/:cv_id** : Récupère un CV spécifique.

  - Réponse : `{ "cv": "object", "persoContent": "object", "expPedago": "array", "expPro": "array", "commentaires": "array", "isCreator": "boolean" }`
  - Code source :
    ```javascript:OnlineCV/backend/routes/cv.js
    startLine: 85
    endLine: 122
    ```

- **GET /api/cv/cvs** : Récupère tous les CV publics.
  - Réponse : `array`
  - Code source :
    ```javascript:OnlineCV/backend/routes/cv.js
    startLine: 124
    endLine: 134
    ```

### Utilisateur

- **GET /api/user/cvs/public** : Récupère tous les utilisateurs avec leurs CVs publics.
  - Réponse : `array`
  - Code source :
    ```javascript:OnlineCV/backend/routes/user.js
    startLine: 8
    endLine: 26
    ```

## Variables d'environnement

### Backend

- **DATABASE_URL** : URL de connexion à la base de données MongoDB.

  - Exemple : `DATABASE_URL=mongodb+srv://username:password@cluster0.mongodb.net/onlinecv`
  - Code source :
    ```OnlineCV/backend/.env
    startLine: 1
    endLine: 1
    ```

- **PORT** : Port sur lequel le serveur backend écoute.

  - Exemple : `PORT=3002`
  - Code source :
    ```OnlineCV/backend/.env
    startLine: 2
    endLine: 2
    ```

- **JWT_SECRET** : Clé secrète pour signer les tokens JWT.
  - Exemple : `JWT_SECRET=yourSuperSecretKey123!`
  - Code source :
    ```OnlineCV/backend/.env
    startLine: 3
    endLine: 3
    ```

### Frontend

- **VITE_API_URL** : URL de l'API pour le frontend.
  - Exemple : `VITE_API_URL='http://localhost:3002'`
  - Code source :
    ```OnlineCV/onlinecv/.env
    startLine: 1
    endLine: 1
    ```
