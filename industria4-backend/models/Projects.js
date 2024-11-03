// models/Projects.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const ProjectTypes = require('./ProjectTypes');

const Projects = sequelize.define(
  'Projects',
  {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    project_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProjectTypes,
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: 'projects',
  }
);

// Definir relaciones
Projects.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Projects, { foreignKey: 'user_id' });

Projects.belongsTo(ProjectTypes, { foreignKey: 'project_type_id' });
ProjectTypes.hasMany(Projects, { foreignKey: 'project_type_id' });

module.exports = Projects;
