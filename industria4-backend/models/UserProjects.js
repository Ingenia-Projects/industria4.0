// models/UserProjects.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Projects = require('./Projects');

const UserProjects = sequelize.define(
  'UserProjects',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Projects,
        key: 'project_id',
      },
      allowNull: false,
    },
  },
  {
    tableName: 'user_projects',
    timestamps: false,
  }
);

// Relaciones muchos a muchos
User.belongsToMany(Projects, { through: UserProjects, foreignKey: 'user_id' });
Projects.belongsToMany(User, { through: UserProjects, foreignKey: 'project_id' });

module.exports = UserProjects;
