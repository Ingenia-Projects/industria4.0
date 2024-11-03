// src/api/projects.js

import { apiClient } from './apiClient';

export const getProjects = async () => {
  try {
    const response = await apiClient.get('/projects');
    return response.data.projects;
  } catch (error) {
    console.error('Error al obtener los proyectos:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await apiClient.post('/projects', projectData);
    return response.data.project;
  } catch (error) {
    console.error('Error al crear el proyecto:', error);
    throw error;
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await apiClient.put(`/projects/${projectId}`, projectData);
    return response.data.project;
  } catch (error) {
    console.error('Error al actualizar el proyecto:', error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await apiClient.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    throw error;
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}`);
    return response.data.project;
  } catch (error) {
    console.error('Error al obtener el proyecto por ID:', error);
    throw error;
  }
};
