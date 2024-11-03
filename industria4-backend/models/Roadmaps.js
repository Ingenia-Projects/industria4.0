// models/Roadmaps.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Projects = require('./Projects');

const Roadmaps = sequelize.define(
  'Roadmaps',
  {
    roadmap_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Projects,
        key: 'project_id',
      },
      onDelete: 'CASCADE',
    },
    overall_strategy: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'roadmaps',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Establecer la asociación con Projects
Roadmaps.associate = function (models) {
  Roadmaps.belongsTo(models.Projects, { foreignKey: 'project_id', as: 'project' });
};

module.exports = Roadmaps;
