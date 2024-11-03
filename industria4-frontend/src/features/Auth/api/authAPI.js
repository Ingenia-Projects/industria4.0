// src/features/Auth/api/authAPI.js

export const login = async (email, password) => {
  const response = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Error al autenticarse');
  }

  const data = await response.json();
  return data;
};

export const validateToken = async (token) => {
  const response = await fetch('http://localhost:4000/api/auth/validate-token', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    // Si el token no es válido, podemos devolver false o lanzar un error
    return false;
  }

  const data = await response.json();
  return data.valid; // Suponiendo que el backend devuelve { valid: true } si el token es válido
};
