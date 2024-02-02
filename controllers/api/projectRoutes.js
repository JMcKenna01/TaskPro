import { Router } from 'express'
import { Project } from '../../models/Project.js'
import { withAuth } from '../../utils/auth.js'

export const projectRoutes = Router()

projectRoutes.get('/', async (req, res) => {
  res.json('test respone')
  // try {
  //   const newProject = await Project.create({
  //     ...req.body,
  //     user_id: req.session.user_id,
  //   });

  //   res.status(200).json(newProject);
  // } catch (err) {
  //   res.status(400).json(err);
  // }
});

projectRoutes.post('/', withAuth, async (req, res) => {
  res.json('test respone')
  // try {
  //   const newProject = await Project.create({
  //     ...req.body,
  //     user_id: req.session.user_id,
  //   });

  //   res.status(200).json(newProject);
  // } catch (err) {
  //   res.status(400).json(err);
  // }
});

projectRoutes.delete('/:id', withAuth, async (req, res) => {
  res.json('test respone')
  // try {
  //   const projectData = await Project.destroy({
  //     where: {
  //       id: req.params.id,
  //       user_id: req.session.user_id,
  //     },
  //   });

  //   if (!projectData) {
  //     res.status(404).json({ message: 'No project found with this id!' });
  //     return;
  //   }

  //   res.status(200).json(projectData);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});
