// routes/projects.js

const express = require('express');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById, // Añadido para importar la función getProjectById
} = require('../controllers/projectsController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Obtener proyectos del usuario autenticado
router.get('/', authMiddleware, getProjects);

// Crear un nuevo proyecto
router.post('/', authMiddleware, createProject);

// Actualizar un proyecto existente
router.put('/:projectId', authMiddleware, updateProject);

// Eliminar un proyecto existente
router.delete('/:projectId', authMiddleware, deleteProject);

// Obtener detalles de un proyecto específico
router.get('/:projectId', authMiddleware, getProjectById);

module.exports = router;
