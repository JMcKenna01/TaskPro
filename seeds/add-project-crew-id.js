import { Project } from "../models/Project.js"
import { Op } from "sequelize"

const project1ids = [1, 3, 5]
const project2ids = [2, 4, 6]

export const updateProjectCrewIds = async () => {
  await Project.update({ project_crew_id: 1 }, { where: {
      id: {
        [Op.in]: project1ids,
      },
    } 
  })
  console.log('Crew 1 jobs set')
  await Project.update({ project_crew_id: 2 }, { where: {
      id: {
        [Op.in]: project2ids,
      },
    } 
  })
  console.log('Crew 2 jobs set')
}
