// src/api/apiClient.js

import axios from 'axios';
import { getAuthToken } from '../features/Auth/utils/authUtils';

const API_BASE_URL = 'http://localhost:4000/api';

// Crear una instancia de Axios
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para incluir el token en cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
