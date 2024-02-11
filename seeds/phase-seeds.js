import { Phase } from '../models/Phase.js'

const phaseData = [
  {
    phase_name: 'Assigned'
  },
  {
    phase_name: 'Started'
  },
  {
    phase_name: 'In Progress'
  },
  {
    phase_name: 'Finished'
  },
]

export const seedPhases = () => Phase.bulkCreate(phaseData)