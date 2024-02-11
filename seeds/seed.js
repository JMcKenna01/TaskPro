import { seedUsers } from './user-seeds.js'
import { seedProjects } from './project-seeds.js'
import { seedPhases } from './phase-seeds.js'
import { seedCrews } from './crew-seeds.js'
import { updateCrewIds } from './add-crew-ids.js'
import { updateProjectCrewIds } from './add-project-crew-id.js'

import { sequelize } from '../config/connection.js'

const seedAll = async () => {
  await sequelize.sync({ force: true })
  console.log('\n----- DATABASE SYNCED -----\n')

  await seedPhases()
  console.log('\n----- PHASES SEEDED -----\n')
  
  await seedUsers()
  console.log('\n----- USERS SEEDED -----\n')

  await seedCrews()
  await updateCrewIds()
  console.log('\n----- CREWS SEEDED -----\n')

  await seedProjects()
  await updateProjectCrewIds()
  console.log('\n----- PROJECTS SEEDED -----\n')

  process.exit(0)
}

seedAll()
