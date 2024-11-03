// models/ValuationAnswers.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ValuationAnswers = sequelize.define(
  'ValuationAnswers',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    evaluation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'evaluations',
        key: 'id',
      },
      onDelete: 'CASCADE', // Eliminar ValuationAnswers al eliminar Evaluations
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'project_id',
      },
      onDelete: 'CASCADE', // Eliminar ValuationAnswers al eliminar Projects
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id',
      },
      // No agregar onDelete: 'CASCADE' para evitar eliminar Questions
    },
    answer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'answers',
        key: 'id',
      },
      // No agregar onDelete: 'CASCADE' para evitar eliminar Answer
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'valuation_answers',
    timestamps: false,
  }
);

module.exports = ValuationAnswers;
