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
const Roadmaps = require('./Roadmaps');

// Definir relaciones

// Users y Projects
User.hasMany(Projects, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Projects.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Projects y ProjectTypes
ProjectTypes.hasMany(Projects, { foreignKey: 'project_type_id', onDelete: 'CASCADE' });
Projects.belongsTo(ProjectTypes, { foreignKey: 'project_type_id', onDelete: 'CASCADE' });

// Evaluations y Projects
Projects.hasMany(Evaluations, { foreignKey: 'project_id', onDelete: 'CASCADE' });
Evaluations.belongsTo(Projects, { foreignKey: 'project_id', onDelete: 'CASCADE' });

// Evaluations y Areas
Areas.hasMany(Evaluations, { foreignKey: 'area_id', onDelete: 'CASCADE' });
Evaluations.belongsTo(Areas, { foreignKey: 'area_id', onDelete: 'CASCADE' });

// Evaluations y SubareaEvaluations
Evaluations.hasMany(SubareaEvaluations, { foreignKey: 'evaluation_id', onDelete: 'CASCADE' });
SubareaEvaluations.belongsTo(Evaluations, { foreignKey: 'evaluation_id', onDelete: 'CASCADE' });

// SubareaEvaluations y Subareas
Subareas.hasMany(SubareaEvaluations, { foreignKey: 'subarea_id', onDelete: 'CASCADE' });
SubareaEvaluations.belongsTo(Subareas, { foreignKey: 'subarea_id', onDelete: 'CASCADE' });

// Areas y Subareas
Areas.hasMany(Subareas, { foreignKey: 'area_id', onDelete: 'CASCADE' });
Subareas.belongsTo(Areas, { foreignKey: 'area_id', onDelete: 'CASCADE' });

// ValuationAnswers y Evaluations
Evaluations.hasMany(ValuationAnswers, { foreignKey: 'evaluation_id', onDelete: 'CASCADE' });
ValuationAnswers.belongsTo(Evaluations, { foreignKey: 'evaluation_id', onDelete: 'CASCADE' });

// ValuationAnswers y Questions
Questions.hasMany(ValuationAnswers, { foreignKey: 'question_id', onDelete: 'CASCADE' });
ValuationAnswers.belongsTo(Questions, { foreignKey: 'question_id', onDelete: 'CASCADE' });

// ValuationAnswers y Answer
Answer.hasMany(ValuationAnswers, { foreignKey: 'answer_id', onDelete: 'CASCADE' });
ValuationAnswers.belongsTo(Answer, { foreignKey: 'answer_id', onDelete: 'CASCADE' });

// Questions y Subareas
Subareas.hasMany(Questions, { foreignKey: 'subarea_id', onDelete: 'CASCADE' });
Questions.belongsTo(Subareas, { foreignKey: 'subarea_id', onDelete: 'CASCADE' });

// Answers y Questions
Questions.hasMany(Answer, { foreignKey: 'question_id', onDelete: 'CASCADE' });
Answer.belongsTo(Questions, { foreignKey: 'question_id', onDelete: 'CASCADE' });

// Projects y Roadmaps
Projects.hasOne(Roadmaps, { foreignKey: 'project_id', onDelete: 'CASCADE' });
Roadmaps.belongsTo(Projects, { foreignKey: 'project_id', onDelete: 'CASCADE' });

// Users y Roadmaps (si es necesario)
// User.hasMany(Roadmaps, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// Roadmaps.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Exportar modelos y sequelize
module.exports = {
  sequelize,
  Sequelize,
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
  Roadmaps,
};
