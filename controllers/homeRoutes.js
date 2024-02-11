import { Router } from 'express'
import { withAuth } from '../utils/auth.js'
import * as models from '../models/Index.js'

export const homeRoutes = Router()

homeRoutes.get('/', async (req, res) => {
  res.render('homepage')
})

homeRoutes.get('/projects/:id', withAuth, async (req, res) => {
  try {
    const projectData = await models.Project.findByPk(req.params.id, { 
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

    const project = projectData.get({ plain: true })

    console.log(req.session.auth)

    res.render('project', {
      ...project,
      ...req.session.auth,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

homeRoutes.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await models.User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    })

    const user = userData.get({ plain: true })
    
    res.render('profile', {
      ...user,
      logged_in: true
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

homeRoutes.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile')
    return
  }else{
    res.render('login')
  }
})