// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/Auth/context/AuthContext'; // Importación corregida

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
