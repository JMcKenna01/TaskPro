import { User } from "../models/User.js"
import { Op } from "sequelize"

const crew1ids = [2, 4, 5, 6]
const crew2ids = [3, 7, 8, 9]


export const updateCrewIds = async () => {
    await User.update({ crew_id: 1 }, { where: {
        id: {
          [Op.in]: crew1ids,
        },
      } 
    })
    console.log('Crew 1 set')
    await User.update({ crew_id: 2 }, { where: {
        id: {
          [Op.in]: crew2ids,
        },
      } 
    })
    console.log('Crew 2 set')
}
