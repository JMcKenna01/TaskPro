import { Router } from 'express'
import { withAuth } from '../utils/auth.js'

export const homeRoutes = Router()

homeRoutes.get('/', async (req, res) => {
  res.json('test respone')
  // try {
  //   // Get all projects and JOIN with user data
  //   const projectData = await Project.findAll({
  //     include: [
  //       {
  //         model: User,
  //         attributes: ['name'],
  //       },
  //     ],
  //   });

  //   // Serialize data so the template can read it
  //   const projects = projectData.map((project) => project.get({ plain: true }));

  //   // Pass serialized data and session flag into template
  //   res.render('homepage', { 
  //     projects, 
  //     logged_in: req.session.logged_in 
  //   });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
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

homeRoutes.get('/profile', withAuth, async (req, res) => {
  res.json('test respone')
  // try {
  //   const userData = await User.findByPk(req.session.user_id, {
  //     attributes: { exclude: ['password'] },
  //     include: [{ model: Project }],
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

homeRoutes.get('/login', (req, res) => {
  res.json('test respone')
  // if (req.session.logged_in) {
  //   res.redirect('/profile');
  //   return;
  // }

  // res.render('login');
});
