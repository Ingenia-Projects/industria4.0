// src/context/ActiveProjectContext.js

import React, { createContext, useState, useEffect } from 'react';
import { getProjectById } from '../api/projects';

export const ActiveProjectContext = createContext();

export const ActiveProjectProvider = ({ children }) => {
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  // Cargar activeProjectId desde localStorage al iniciar
  useEffect(() => {
    const storedProjectId = localStorage.getItem('activeProjectId');
    if (storedProjectId) {
      setActiveProjectId(parseInt(storedProjectId, 10));
    }
  }, []);

  // Cuando activeProjectId cambia, obtener los datos del proyecto activo
  useEffect(() => {
    if (activeProjectId !== null) {
      // Guardar activeProjectId en localStorage
      localStorage.setItem('activeProjectId', activeProjectId);

      // Obtener datos del proyecto activo
      const fetchActiveProject = async () => {
        try {
          const project = await getProjectById(activeProjectId);
          setActiveProject(project);
        } catch (error) {
          console.error('Error al obtener el proyecto activo:', error);
          setActiveProject(null);
        }
      };
      fetchActiveProject();
    } else {
      // Si no hay activeProjectId, eliminar de localStorage
      localStorage.removeItem('activeProjectId');
      setActiveProject(null);
    }
  }, [activeProjectId]);

  const setActiveProjectById = (projectId) => {
    setActiveProjectId(projectId);
  };

  return (
    <ActiveProjectContext.Provider
      value={{
        activeProjectId,
        activeProject,
        setActiveProjectById,
      }}
    >
      {children}
    </ActiveProjectContext.Provider>
  );
};
