import { Router } from 'express'
import * as models from '../models/Index.js'

export const dashboardRoutes = Router()

dashboardRoutes.get('/manager', async (req,res) => {
  try {
    const userData = await models.User.findAll({
      where: {
        is_supervisor: true
      },
      attributes: { exclude: ['password'] },
    })

    const users = userData.map((user) => user.get({ plain: true }))
    
    const projectData = await models.Project.findAll({
      where: {
      project_manager_id: req.session.user_id
    }, 
    include: [
      {
        model: models.User,
        as: 'supervisor',
        attributes: ['first_name', 'last_name'],
      },
      {
        model: models.User,
        as: 'manager',
        attributes: ['first_name', 'last_name'],
      },
      {
        model: models.Phase,
        attributes: ['phase_name'],
      },
    ]})

    const projects = projectData.map((project) => project.get({ plain: true }))

    const phaseData = await models.Phase.findAll()

    const phases = phaseData.map((phase) => phase.get({ plain: true }))
    
    res.render('managerDashboard', {
      users: users,
      projects: projects,
      phases: phases,
      logged_in: true
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

dashboardRoutes.get('/supervisor', async(req,res) => {
    try {        
        const projectData = await models.Project.findAll({
          where: {
          project_super_id: req.session.user_id
        }, 
        include: [
          {
            model: models.User,
            as: 'supervisor',
            attributes: ['first_name', 'last_name'],
          },
          {
            model: models.User,
            as: 'manager',
            attributes: ['first_name', 'last_name'],
          },
          {
            model: models.Phase,
            attributes: ['phase_name'],
          },
        ]})
    
        const projects = projectData.map((project) => project.get({ plain: true }))
    
        const phaseData = await models.Phase.findAll()
    
        const phases = phaseData.map((phase) => phase.get({ plain: true }))
        
        res.render('supervisorDashboard', {
          projects: projects,
          phases: phases,
          logged_in: true
        })
      } catch (err) {
        res.status(500).json(err)
      }
})

dashboardRoutes.get('/crew', async (req,res) => {
    try {
        const userData = await models.User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
        })

        const projectData = await models.Project.findAll({
          where: {
          project_crew_id: userData.crew_id
        }, 
        include: [
          {
            model: models.User,
            as: 'supervisor',
            attributes: ['first_name', 'last_name'],
          },
          {
            model: models.User,
            as: 'manager',
            attributes: ['first_name', 'last_name'],
          },
          {
            model: models.Phase,
            attributes: ['phase_name'],
          },
        ]})
    
        const projects = projectData.map((project) => project.get({ plain: true }))
        
        res.render('crewDashboard', {
          projects: projects,
          logged_in: true
        })
      } catch (err) {
        res.status(500).json(err)
      }

})


