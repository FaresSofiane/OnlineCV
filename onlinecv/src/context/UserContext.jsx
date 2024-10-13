import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Fonction pour se connecter et stocker les informations utilisateur + token
    const login = (logInfos, authToken) => {
        setUser({ ...logInfos });
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify({ ...logInfos }));
        localStorage.setItem('token', authToken); // Stocker le token JWT
    };

    // Fonction pour se déconnecter et supprimer les informations utilisateur + token
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Supprimer le token JWT
    };

    // Fonction pour récupérer les infos utilisateur stockées ou vérifier si déjà connecté
    const getUserInfos = () => {
        if (user) {
            return user;
        } else {
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
                return JSON.parse(storedUser);
            }
        }
        return null;
    };

    // Vérifie si un utilisateur est déjà connecté au chargement du composant
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    return (
        <UserContext.Provider value={{ login, getUserInfos, logout, token, user }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { UserProvider };