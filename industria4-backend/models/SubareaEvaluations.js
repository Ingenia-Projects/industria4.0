// models/SubareaEvaluations.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Evaluations = require('./Evaluations');
const Subareas = require('./Subareas');

const SubareaEvaluations = sequelize.define(
  'SubareaEvaluations',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    evaluation_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Evaluations,
        key: 'id',
      },
      allowNull: false,
    },
    subarea_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Subareas,
        key: 'id',
      },
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    completion_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'subarea_evaluations',
    timestamps: false,
  }
);

// Relaciones
SubareaEvaluations.belongsTo(Evaluations, { foreignKey: 'evaluation_id' });
SubareaEvaluations.belongsTo(Subareas, { foreignKey: 'subarea_id' });
Evaluations.hasMany(SubareaEvaluations, { foreignKey: 'evaluation_id' });
Subareas.hasMany(SubareaEvaluations, { foreignKey: 'subarea_id' });

module.exports = SubareaEvaluations;
