import { Crew } from '../models/Crew.js'

const commentData = [
  {
    crew_number: 1,
    crew_manager_id:1,
    crew_super_id: 3,
  },
  {
    crew_number: 2,
    crew_manager_id:1,
    crew_super_id: 2,
  },
]

export const seedCrews = () => Crew.bulkCreate(commentData)