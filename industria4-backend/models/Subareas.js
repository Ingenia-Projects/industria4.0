// models/Subareas.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subareas = sequelize.define(
  'Subareas',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'areas', // Usamos el nombre de la tabla directamente
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'subareas',
    timestamps: false,
  }
);

module.exports = Subareas;
