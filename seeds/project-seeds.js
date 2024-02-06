import { Project } from '../models/Project.js'

const projectData = [
  {
    project_name: 'Views with Handlebars',
    project_phase_id: 1,
    project_super_id: 3,
    project_manager_id: 1,
  },
  {
    project_name: 'Controllers with Express',
    project_phase_id: 1,
    project_super_id: 3,
    project_manager_id: 1,
  },
  {
    project_name: 'Auth with bCrypt',
    project_phase_id: 1,
    project_super_id: 3,
    project_manager_id: 1,
  },
  {
    project_name: 'Models with Sequelize',
    project_phase_id: 1,
    project_super_id: 2,
    project_manager_id: 1,
  },
  {
    project_name: 'CSS with Bootstrap',
    project_phase_id: 1,
    project_super_id: 2,
    project_manager_id: 1,
  },
  {
    project_name: 'Web App with MVC',
    project_phase_id: 1,
    project_super_id: 2,
    project_manager_id: 1,
  },
]

export const seedProjects = () => Project.bulkCreate(projectData)
