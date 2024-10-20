import React, { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    if (!user) {
        // If the user is not authenticated, redirect to the login screen
        return <Navigate to="/login" />;
    }

    // If the user is authenticated, render the children (protected content)
    return children;
};

export default ProtectedRoute;