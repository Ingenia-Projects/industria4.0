// models/index.js

const sequelize = require('../config/database');
const Sequelize = require('sequelize');

// Importar modelos
const User = require('./User');
const Projects = require('./Projects');
const ProjectTypes = require('./ProjectTypes');
const Areas = require('./Areas');
const Subareas = require('./Subareas');
const Evaluations = require('./Evaluations');
const SubareaEvaluations = require('./SubareaEvaluations');
const ValuationAnswers = require('./ValuationAnswers');
const Questions = require('./Questions');
const Answer = require('./Answer');
const Roadmaps = require('./Roadmaps'); // Importar el modelo Roadmaps

// Definir relaciones

// Users y Projects
User.hasMany(Projects, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Projects.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Projects y ProjectTypes
ProjectTypes.hasMany(Projects, { foreignKey: 'project_type_id', onDelete: 'CASCADE' });
Projects.belongsTo(ProjectTypes, { foreignKey: 'project_type_id', onDelete: 'CASCADE' });

// Evaluations y Projects
Evaluations.belongsTo(Projects, { foreignKey: 'project_id', onDelete: 'CASCADE' });
Projects.hasMany(Evaluations, { foreignKey: 'project_id', onDelete: 'CASCADE' });

// ValuationAnswers y Projects
ValuationAnswers.belongsTo(Projects, { foreignKey: 'project_id', onDelete: 'CASCADE' });
Projects.hasMany(ValuationAnswers, { foreignKey: 'project_id', onDelete: 'CASCADE' });

// ValuationAnswers y Evaluations
ValuationAnswers.belongsTo(Evaluations, { foreignKey: 'evaluation_id', onDelete: 'CASCADE' });
Evaluations.hasMany(ValuationAnswers, { foreignKey: 'evaluation_id', onDelete: 'CASCADE' });

// ValuationAnswers y Questions
ValuationAnswers.belongsTo(Questions, { foreignKey: 'question_id', onDelete: 'CASCADE' });
Questions.hasMany(ValuationAnswers, { foreignKey: 'question_id', onDelete: 'CASCADE' });

// ValuationAnswers y Answer
ValuationAnswers.belongsTo(Answer, { foreignKey: 'answer_id', onDelete: 'CASCADE' });
Answer.hasMany(ValuationAnswers, { foreignKey: 'answer_id', onDelete: 'CASCADE' });

// Questions y Subareas
Questions.belongsTo(Subareas, { foreignKey: 'subarea_id', onDelete: 'CASCADE' });
Subareas.hasMany(Questions, { foreignKey: 'subarea_id', onDelete: 'CASCADE' });

// Answer y Questions
Answer.belongsTo(Questions, { foreignKey: 'question_id', onDelete: 'CASCADE' });
Questions.hasMany(Answer, { foreignKey: 'question_id', onDelete: 'CASCADE' });

// Projects y Roadmaps
Projects.hasOne(Roadmaps, { foreignKey: 'project_id', onDelete: 'CASCADE' });
Roadmaps.belongsTo(Projects, { foreignKey: 'project_id', onDelete: 'CASCADE' });

// Exportar modelos y sequelize
module.exports = {
  sequelize,
  User,
  Projects,
  ProjectTypes,
  Areas,
  Subareas,
  Evaluations,
  SubareaEvaluations,
  ValuationAnswers,
  Questions,
  Answer,
  Roadmaps, // Exportar el modelo Roadmaps
};
