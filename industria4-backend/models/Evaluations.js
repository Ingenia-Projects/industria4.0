// models/Evaluations.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Evaluations = sequelize.define(
  'Evaluations',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'project_id',
      },
      onDelete: 'CASCADE', // Asegura eliminación en cascada
    },
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'areas',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    overall_score: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    progress: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    section_progress: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'evaluations',
    timestamps: false,
  }
);

module.exports = Evaluations;
