import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './contexts/authContext';

const ProtectedRoutes = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
