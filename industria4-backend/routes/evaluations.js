// routes/evaluations.js

const express = require('express');
const { getEvaluationsByProject, getEvaluationById } = require('../controllers/evaluationsController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Obtener evaluaciones de un proyecto específico
router.get('/projects/:projectId/evaluations', authMiddleware, getEvaluationsByProject);

// Obtener detalles de una evaluación específica
router.get('/:evaluationId', authMiddleware, getEvaluationById);

module.exports = router;
