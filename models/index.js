import User from './User';
import Project from './Project';
import Phase from './Phase';
import Crew from './Crew';

User.belongsTo(Crew, { foreignKey: 'crew_id' });
Crew.hasMany(User, { foreignKey: 'crew_id' });

Project.belongsTo(Phase, { foreignKey: 'project_phase_id' });
Project.belongsTo(User, { as: 'Supervisor', foreignKey: 'project_super_id' });
Project.belongsTo(User, { as: 'Manager', foreignKey: 'project_manager_id' });

Crew.belongsTo(User, { as: 'Manager', foreignKey: 'crew_manager_id' });
Crew.belongsTo(User, { as: 'Supervisor', foreignKey: 'crew_super_id' });

export { User, Project, Phase, Crew };
