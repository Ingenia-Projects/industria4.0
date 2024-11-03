// controllers/projectTypesController.js

const { ProjectTypes } = require('../models');

exports.getProjectTypes = async (req, res) => {
  try {
    const projectTypes = await ProjectTypes.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']],
    });

    if (!projectTypes || projectTypes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron tipos de proyectos.' });
    }

    return res.status(200).json({ projectTypes });
  } catch (error) {
    console.error('Error al obtener los tipos de proyectos:', error.message);
    return res.status(500).json({ message: 'Error al obtener los tipos de proyectos', error: error.message });
  }
};
