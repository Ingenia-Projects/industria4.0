// src/features/Auth/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginApi, validateToken as validateTokenApi } from '../api/authAPI';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función de login
  const login = async (email, password) => {
    try {
      const data = await loginApi(email, password);
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (error) {
      throw new Error('Error al iniciar sesión: ' + error.message);
    }
  };

  // Función de logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  // Función para validar el token
  const validateToken = async (storedToken) => {
    try {
      const isValid = await validateTokenApi(storedToken);
      if (isValid) {
        setToken(storedToken);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Validar el token al cargar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      validateToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
