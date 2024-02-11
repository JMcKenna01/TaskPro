import { Router } from 'express'
import { Project } from '../../models/Project.js'
import { User } from '../../models/User.js'
import { Phase } from '../../models/Phase.js'

export const projectRoutes = Router()

projectRoutes.get('/', async (req, res) => {
  //Gets all projects
  try {
    const projectData = await Project.findAll({include: [
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
      {
        model: Phase,
        attributes: ['phase_name'],
      },
    ]})

    if (!projectData) {
      res.status(404).json({ message: 'No projects found!' });
      return;
    }

    res.status(200).json(projectData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

projectRoutes.get('/:id', async (req, res) => {
  //Gets one project by ID
  try {
    const projectData = await Project.findByPk(req.params.id, {include: [
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
      {
        model: Phase,
        attributes: ['phase_name'],
      },
    ]})

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

projectRoutes.post('/', async (req, res) => {
  // create a new project
  try {
    const newProject = {
      ...req.body,
      project_manager_id: req.session.user_id,
    }

    await Project.create(newProject)

    res.status(200).json(newProject)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

projectRoutes.put('/:id', async (req, res) => {
  // update a project's data by its `id` value
  try {
    const updatedProject = await Project.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    if (!updatedProject) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }
    
    res.status(200).json(updatedProject)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }  
})

projectRoutes.delete('/:id', async (req, res) => {
  // deletes project by its `id` value
  try {
    const deletedProject = await Project.destroy({
      where: {
        id: req.params.id,
        // project_manager_id: req.session.user_id,
      },
    })

    if (!deletedProject) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(`${deletedProject} Project deleted!`)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
