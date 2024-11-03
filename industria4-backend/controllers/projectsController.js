// controllers/projectsController.js

const { Op } = require('sequelize');
const {
  Projects,
  ProjectTypes,
  Areas,
  Subareas,
  Evaluations,
  SubareaEvaluations,
  ValuationAnswers,
  Roadmaps, // Importar el modelo de Roadmaps
  sequelize,
} = require('../models');

// Obtener todos los proyectos del usuario
exports.getProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    // Obtener proyectos del usuario autenticado
    const projects = await Projects.findAll({
      where: { user_id: userId },
      include: [
        {
          model: ProjectTypes,
          attributes: ['id', 'name'],
        },
        {
          model: Roadmaps,
          attributes: ['roadmap_id', 'overall_strategy'],
        },
      ],
      attributes: ['project_id', 'project_name', 'description', 'created_at'],
      raw: true,
      nest: true,
    });

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: 'No se encontraron proyectos para este usuario.' });
    }

    return res.status(200).json({ projects });
  } catch (error) {
    console.error('Error al obtener los proyectos:', error.message);
    return res.status(500).json({ message: 'Error al obtener los proyectos', error: error.message });
  }
};

// Crear un nuevo proyecto
exports.createProject = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const { project_name, description, project_type_id } = req.body;

    // Validar datos de entrada
    if (!project_name || !project_type_id) {
      await t.rollback();
      return res.status(400).json({ message: 'El nombre del proyecto y el tipo de proyecto son requeridos.' });
    }

    // Verificar que el tipo de proyecto existe
    const projectType = await ProjectTypes.findByPk(project_type_id);
    if (!projectType) {
      await t.rollback();
      return res.status(404).json({ message: 'El tipo de proyecto especificado no existe.' });
    }

    // Crear el proyecto con user_id
    const project = await Projects.create(
      {
        project_name,
        description,
        project_type_id,
        user_id: userId, // Establecer user_id
      },
      { transaction: t }
    );

    // Crear el roadmap asociado al proyecto
    const roadmap = await Roadmaps.create(
      {
        project_id: project.project_id,
        overall_strategy: '', // Puedes inicializarlo vacío o con un valor por defecto
      },
      { transaction: t }
    );

    // Obtener todas las áreas
    const areas = await Areas.findAll({ transaction: t });

    // Por cada área, crear una evaluación asociada al proyecto
    for (const area of areas) {
      const evaluation = await Evaluations.create(
        {
          project_id: project.project_id,
          area_id: area.id,
          overall_score: 0, // Inicializar con 0
          progress: 0,
          section_progress: {},
        },
        { transaction: t }
      );

      // Obtener las subáreas de esa área
      const subareas = await Subareas.findAll({
        where: { area_id: area.id },
        transaction: t,
      });

      // Por cada subárea, crear una subarea_evaluation asociada a la evaluación
      for (const subarea of subareas) {
        await SubareaEvaluations.create(
          {
            evaluation_id: evaluation.id,
            subarea_id: subarea.id,
            score: 0, // Inicializar con 0
            completion_status: false,
          },
          { transaction: t }
        );
      }
    }

    await t.commit();
    return res.status(201).json({ message: 'Proyecto y roadmap creados exitosamente', project, roadmap });
  } catch (error) {
    await t.rollback();
    console.error('Error al crear el proyecto y el roadmap:', error.message);
    return res.status(500).json({ message: 'Error al crear el proyecto y el roadmap', error: error.message });
  }
};

// Actualizar un proyecto existente
exports.updateProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.projectId;
    const { project_name, description, project_type_id } = req.body;

    // Buscar el proyecto y asegurarse de que pertenece al usuario autenticado
    const project = await Projects.findOne({
      where: { project_id: projectId, user_id: userId },
    });

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado o no tienes permiso para editarlo.' });
    }

    // Actualizar los campos del proyecto
    if (project_name !== undefined) project.project_name = project_name;
    if (description !== undefined) project.description = description;
    if (project_type_id !== undefined) {
      // Verificar que el nuevo project_type_id existe
      const projectType = await ProjectTypes.findByPk(project_type_id);
      if (!projectType) {
        return res.status(404).json({ message: 'El tipo de proyecto especificado no existe.' });
      }
      project.project_type_id = project_type_id;
    }

    // Guardar los cambios
    await project.save();

    return res.status(200).json({ message: 'Proyecto actualizado exitosamente', project });
  } catch (error) {
    console.error('Error al actualizar el proyecto:', error.message);
    return res.status(500).json({ message: 'Error al actualizar el proyecto', error: error.message });
  }
};

// Eliminar un proyecto existente
exports.deleteProject = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const projectId = req.params.projectId;

    // Buscar el proyecto y asegurarse de que pertenece al usuario autenticado
    const project = await Projects.findOne({
      where: { project_id: projectId, user_id: userId },
      transaction: t,
    });

    if (!project) {
      await t.rollback();
      return res.status(404).json({ message: 'Proyecto no encontrado o no tienes permiso para eliminarlo.' });
    }

    // Eliminar el roadmap asociado al proyecto
    await Roadmaps.destroy({
      where: { project_id: project.project_id },
      transaction: t,
    });

    // Eliminar el proyecto
    await project.destroy({ transaction: t });

    await t.commit();
    return res.status(200).json({ message: 'Proyecto y roadmap eliminados exitosamente' });
  } catch (error) {
    await t.rollback();
    console.error('Error al eliminar el proyecto y el roadmap:', error.message);
    return res.status(500).json({ message: 'Error al eliminar el proyecto y el roadmap', error: error.message });
  }
};

// Obtener detalles de un proyecto específico
exports.getProjectById = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.projectId;

    const project = await Projects.findOne({
      where: { project_id: projectId, user_id: userId },
      include: [
        {
          model: ProjectTypes,
          attributes: ['id', 'name'],
        },
        {
          model: Roadmaps,
          attributes: ['roadmap_id', 'overall_strategy'],
        },
      ],
      attributes: ['project_id', 'project_name', 'description', 'created_at'],
    });

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado.' });
    }

    return res.status(200).json({ project });
  } catch (error) {
    console.error('Error al obtener el proyecto:', error.message);
    return res.status(500).json({ message: 'Error al obtener el proyecto', error: error.message });
  }
};
