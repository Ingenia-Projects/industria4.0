// controllers/evaluationsController.js

const { Evaluations, Projects, Areas, SubareaEvaluations, Subareas } = require('../models');

// Obtener detalles de una evaluación específica
exports.getEvaluationById = async (req, res) => {
  try {
    const userId = req.user.id;
    const evaluationId = req.params.evaluationId;

    // Obtener la evaluación y verificar que pertenece al usuario
    const evaluation = await Evaluations.findOne({
      where: { id: evaluationId },
      include: [
        {
          model: Projects,
          attributes: [],
          where: { user_id: userId },
        },
        {
          model: Areas,
          attributes: ['id', 'name'],
        },
        {
          model: SubareaEvaluations,
          attributes: ['id', 'subarea_id', 'score', 'completion_status'],
          include: [
            {
              model: Subareas,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
      attributes: ['id', 'area_id', 'overall_score', 'progress', 'section_progress'],
    });

    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluación no encontrada o no tienes acceso.' });
    }

    return res.status(200).json({ evaluation });
  } catch (error) {
    console.error('Error al obtener la evaluación:', error.message);
    return res.status(500).json({ message: 'Error al obtener la evaluación', error: error.message });
  }
};

// Obtener evaluaciones de un proyecto específico
exports.getEvaluationsByProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.projectId;

    // Verificar que el proyecto pertenece al usuario
    const project = await Projects.findOne({
      where: { project_id: projectId, user_id: userId },
    });

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado o no tienes acceso.' });
    }

    // Obtener todas las evaluaciones asociadas al proyecto
    const evaluations = await Evaluations.findAll({
      where: { project_id: projectId },
      include: [
        {
          model: Areas,
          attributes: ['id', 'name'],
        },
        {
          model: SubareaEvaluations,
          attributes: ['id', 'subarea_id', 'score', 'completion_status'],
          include: [
            {
              model: Subareas,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
      attributes: ['id', 'area_id', 'overall_score', 'progress', 'section_progress'],
    });

    if (!evaluations || evaluations.length === 0) {
      return res.status(404).json({ message: 'No se encontraron evaluaciones para este proyecto.' });
    }

    return res.status(200).json({ evaluations });
  } catch (error) {
    console.error('Error al obtener las evaluaciones del proyecto:', error.message);
    return res.status(500).json({ message: 'Error al obtener las evaluaciones del proyecto', error: error.message });
  }
};
