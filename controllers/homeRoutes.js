// Import necessary modules and middleware
import { Router } from 'express'
import { withAuth } from '../utils/auth.js' // Middleware for authentication
import { User, Project, Phase } from '../models/index.js' // Import models

// Create a router for home routes
export const homeRoutes = Router()

// Route for the homepage
homeRoutes.get('/', async (req, res) => {
  // Render the homepage view
  res.render('homepage')
})

// Route for accessing a specific project by its ID, with authentication
homeRoutes.get('/projects/:id', withAuth, async (req, res) => {
  try {
    // Retrieve project data by its primary key (PK) and include related user and phase data
    const projectData = await Project.findByPk(req.params.id, { 
      include: [
        {
          model: User, // Include supervisor data
          as: 'supervisor',
          attributes: ['first_name', 'last_name'],
        },
        {
          model: User, // Include manager data
          as: 'manager',
          attributes: ['first_name', 'last_name'],
        },
        {
          model: Phase, // Include phase data
          attributes: ['phase_name'],
        },
      ]
    })

    // Convert the project data to a plain JavaScript object
    const project = projectData.get({ plain: true })

    // Render the project view with project data and session authentication info
    res.render('project', {
      ...project,
      ...req.session.auth,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    // Handle errors by sending a JSON response with the error status and message
    res.status(500).json(err)
  }
})

// Route for accessing the user's profile, with authentication
homeRoutes.get('/profile', withAuth, async (req, res) => {
  try {
    // Retrieve user data by session user ID, excluding the password from the result
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    })

    // Convert the user data to a plain JavaScript object
    const user = userData.get({ plain: true })
    
    // Render the profile view with user data and set logged_in to true
    res.render('profile', {
      ...user,
      logged_in: true
    })
  } catch (err) {
    // Handle errors by sending a JSON response with the error status and message
    res.status(500).json(err)
  }
})

// Route for the login page
homeRoutes.get('/login', (req, res) => {
  // Check if user is already logged in
  if (req.session.logged_in) {
    // Redirect to the profile page if logged in
    res.redirect('/profile')
    return
  } else {
    // Render the login view if not logged in
    res.render('login')
  }
})
