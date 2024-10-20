import React, { createContext, useState, useEffect } from 'react';

// Create a context for user authentication
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Simulate fetching user data from local storage or an API
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);

        setUser(userData);
        setToken(token);

    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

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
    return (
        <UserContext.Provider value={{ user, login, logout, getUserInfos }}>
            {children}
        </UserContext.Provider>
    );
};