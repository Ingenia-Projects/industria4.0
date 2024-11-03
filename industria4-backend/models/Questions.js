// models/Questions.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Subareas = require('./Subareas'); // Asegúrate de importar el modelo Subareas

const Questions = sequelize.define(
  'Questions',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subarea_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Asegura que no sea nulo
      references: {
        model: 'subareas',
        key: 'id',
      },
      // No incluir onDelete: 'CASCADE'
    },
    question_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'questions',
    timestamps: false,
  }
);

// Definir la asociación
Questions.belongsTo(Subareas, { foreignKey: 'subarea_id' });
Subareas.hasMany(Questions, { foreignKey: 'subarea_id' });

module.exports = Questions;
