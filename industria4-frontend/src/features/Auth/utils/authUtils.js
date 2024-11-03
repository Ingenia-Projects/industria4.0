// src/features/Auth/utils/authUtils.js

export const getAuthToken = () => {
    return localStorage.getItem('token'); // Asegúrate de que el token se almacene bajo la clave 'token'
  };
  