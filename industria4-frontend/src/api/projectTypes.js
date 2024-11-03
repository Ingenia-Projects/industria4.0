// src/api/projectTypes.js

import { apiClient } from './apiClient';

export const getProjectTypes = async () => {
  try {
    const response = await apiClient.get('/projecttypes');
    return response.data.projectTypes;
  } catch (error) {
    console.error('Error al obtener los tipos de proyectos:', error);
    throw error;
  }
};
