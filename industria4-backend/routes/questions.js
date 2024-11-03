// routes/questions.js

const express = require('express');
const {
  getQuestionsByEvaluation,
  getQuestionsBySubarea,
} = require('../controllers/questionsController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

/**
 * @route   GET /api/questions/projects/:projectId/evaluations/:evaluationId/questions
 * @desc    Obtener todas las preguntas y respuestas de una evaluación específica
 * @access  Privado
 */
router.get(
  '/projects/:projectId/evaluations/:evaluationId/questions',
  authMiddleware,
  getQuestionsByEvaluation
);

/**
 * @route   GET /api/questions/projects/:projectId/evaluations/:evaluationId/subareas/:subareaId/questions
 * @desc    Obtener preguntas y respuestas de una subárea específica dentro de una evaluación
 * @access  Privado
 */
router.get(
  '/projects/:projectId/evaluations/:evaluationId/subareas/:subareaId/questions',
  authMiddleware,
  getQuestionsBySubarea
);

module.exports = router;
