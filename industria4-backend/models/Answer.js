// models/Answer.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Answer = sequelize.define(
  'Answer',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id',
      },
      // Eliminamos onDelete: 'CASCADE' para evitar la eliminación de respuestas posibles al eliminar preguntas
    },
    answer_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 6,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'answers',
    timestamps: false,
  }
);

module.exports = Answer;
