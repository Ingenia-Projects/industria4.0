// models/ProjectTypes.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProjectTypes = sequelize.define(
  'ProjectTypes',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'project_types',
    timestamps: false,
  }
);

module.exports = ProjectTypes;
