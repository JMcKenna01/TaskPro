import { Crew } from './Crew.js'
import { User } from './User.js'
import { Phase } from './Phase.js'
import { Project } from './Project.js'

Crew.hasMany(User, { foreignKey: 'crew_id'})
User.belongsTo(Crew, { foreignKey: 'crew_id' })

Phase.hasMany(Project, {foreignKey: 'project_phase_id'})
Project.belongsTo(Phase, { foreignKey: 'project_phase_id' })

User.hasMany(Project, { as: 'supervisor', foreignKey: 'project_super_id' })
Project.belongsTo(User, { as: 'supervisor', foreignKey: 'project_super_id' })

User.hasMany(Project, { as: 'manager', foreignKey: 'project_manager_id' })
Project.belongsTo(User, { as: 'manager', foreignKey: 'project_manager_id' })


Crew.belongsTo(User, { as: 'manager', foreignKey: 'crew_manager_id' })
Crew.belongsTo(User, { as: 'supervisor', foreignKey: 'crew_super_id' })

export { User, Project, Phase, Crew }
