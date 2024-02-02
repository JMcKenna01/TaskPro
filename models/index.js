import User from './User.js'
import Project from './Project.js'
import Phase from './Phase.js'
import Crew from './Crew.js'

Crew.hasMany(User, { foreignKey: 'crew_id'})
User.belongsTo(Crew, { foreignKey: 'crew_id' })

Project.belongsTo(Phase, { foreignKey: 'project_phase_id' })
Project.belongsTo(User, { as: 'Supervisor', foreignKey: 'project_super_id' })
Project.belongsTo(User, { as: 'Manager', foreignKey: 'project_manager_id' })

Crew.belongsTo(User, { as: 'Manager', foreignKey: 'crew_manager_id' })
Crew.belongsTo(User, { as: 'Supervisor', foreignKey: 'crew_super_id' })

export { User, Project, Phase, Crew }
