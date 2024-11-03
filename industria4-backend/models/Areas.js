// models/Areas.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Areas = sequelize.define(
  'Areas',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'areas',
    timestamps: false,
  }
);

module.exports = Areas;
