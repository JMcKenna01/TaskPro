import { Router } from 'express'
import { Crew } from '../../models/Crew.js'
import { User } from '../../models/User.js'

export const crewRoutes = Router()

crewRoutes.get('/', async (req, res) => {
  //Gets all projects
  try {
    const crewData = await Crew.findAll({include: [
      {
        model: User,
        as: 'supervisor',
        attributes: ['first_name', 'last_name'],
      },
      {
        model: User,
        as: 'manager',
        attributes: ['first_name', 'last_name'],
      },
    ]})

    if (!crewData) {
      res.status(404).json({ message: 'No crews found!' });
      return;
    }

    res.status(200).json(crewData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

crewRoutes.get('/:id', async (req, res) => {
  //Gets one project by ID
  try {
    const crewData = await Crew.findByPk(req.params.id, {include: [
      {
        model: User,
        as: 'supervisor',
        attributes: ['first_name', 'last_name'],
      },
      {
        model: User,
        as: 'manager',
        attributes: ['first_name', 'last_name'],
      },
    ]})

    if (!crewData) {
      res.status(404).json({ message: 'No crew found with this id!' });
      return;
    }

    res.status(200).json(crewData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

crewRoutes.post('/', async (req, res) => {
  // create a new project
  try {
    const newCrew = await Crew.create({
      ...req.body
      // project_manager_id: req.session.user_id,
    })

    res.status(200).json(newCrew)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

crewRoutes.put('/:id', async (req, res) => {
  // update a project's data by its `id` value
  try {
    const updatedCrew = await Crew.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    if (!updatedCrew) {
      res.status(404).json({ message: 'No crew found with this id!' });
      return;
    }
    
    res.status(200).json(updatedCrew)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }  
})

crewRoutes.delete('/:id', async (req, res) => {
  // deletes project by its `id` value
  try {
    const deletedCrew = await Crew.destroy({
      where: {
        id: req.params.id,
        // project_manager_id: req.session.user_id,
      },
    })

    if (!deletedCrew) {
      res.status(404).json({ message: 'No crew found with this id!' });
      return;
    }

    res.status(200).json(`${deletedCrew} Crew deleted!`)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
