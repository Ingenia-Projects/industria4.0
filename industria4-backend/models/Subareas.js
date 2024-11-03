// models/Subareas.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Areas = require('./Areas');

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
      references: {
        model: Areas,
        key: 'id',
      },
      allowNull: false,
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

// Relaciones
Subareas.belongsTo(Areas, { foreignKey: 'area_id' });
Areas.hasMany(Subareas, { foreignKey: 'area_id' });

module.exports = Subareas;
