import { Router } from 'express'
import { withAuth } from '../utils/auth.js'
import * as models from '../models/Index.js'

export const homeRoutes = Router()

homeRoutes.get('/', async (req, res) => {
  res.render('homepage')
});

homeRoutes.get('/profile', (req,res) => {
  res.render('profile')
});

homeRoutes.get('/login', (req, res) => {
  res.render('login')

});

homeRoutes.get('/managerDashboard',(req,res) => {
  res.render('managerDashboard')
});

homeRoutes.get('/supervisorDashboard',(req,res) => {
  res.render('supervisorDashboard')
});

homeRoutes.get('/crewDashboard',(req,res) => {
  res.render('crewDashboard')
});

homeRoutes.get('/project',(req,res) => {
  res.render('project')
});


homeRoutes.get('/project/:id', async (req, res) => {
  res.json('test respone')
  // try {
  //   const projectData = await Project.findByPk(req.params.id, {
  //     include: [
  //       {
  //         model: User,
  //         attributes: ['name'],
  //       },
  //     ],
  //   });

  //   const project = projectData.get({ plain: true });

  //   res.render('project', {
  //     ...project,
  //     logged_in: req.session.logged_in
  //   });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

homeRoutes.get('/profile/:id', withAuth, async (req, res) => {
  // try {
  //   const userData = await models.User.findByPk(req.session.user_id, {
  //     attributes: { exclude: ['password'] },
  //   });

  //   const user = userData.get({ plain: true });

  //   res.render('profile', {
  //     ...user,
  //     logged_in: true
  //   });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});




