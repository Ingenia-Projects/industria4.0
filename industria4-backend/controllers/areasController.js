// controllers/areasController.js

const { Areas, Subareas } = require('../models');

// Obtener todas las áreas y sus subáreas
exports.getAreasWithSubareas = async (req, res) => {
  try {
    const areas = await Areas.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: Subareas,
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.status(200).json({ areas });
  } catch (error) {
    console.error('Error al obtener las áreas:', error.message);
    return res.status(500).json({
      message: 'Error al obtener las áreas',
      error: error.message,
    });
  }
};
