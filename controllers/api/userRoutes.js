import { Op } from 'sequelize'
import { sequelize } from '../../config/connection.js'
import { Router } from 'express'
import { User } from '../../models/User.js'
import { Crew } from '../../models/Crew.js'
import { withAuth } from '../../utils/auth.js'

export const userRoutes = Router()

userRoutes.get('/',  withAuth,  async (req, res) => {
  //Gets all users
  try {
    const userData = await User.findAll({attributes: {exclude: ['password']},include: [
      {
        model: Crew,
        attributes: ['crew_number'],
      },
    ]})

    if (!userData) {
      res.status(404).json({ message: 'No users found!' })
      return
    }

    res.status(200).json(userData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

userRoutes.get('/:role', withAuth,  async (req, res) => {
  //Gets supervisors and managers, takes 's' or 'm' parameter
  try {
    let userData
    
    if (req.params.role === 'm'){
      userData = await User.findAll({
        where: {
          is_manager: true
        },
        attributes: { exclude: ['password'] },
      })
    } else if (req.params.role === 's'){
      userData = await User.findAll({
        where: {
          is_supervisor: true
        },
        attributes: { exclude: ['password'] },
      })
    } else if (!userData) {
      res.status(404).json({ message: 'No users found!' })
      return
    }

    res.status(200).json(userData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

userRoutes.put('/addPoint/:id', withAuth,  async (req, res) => {
  //Update completed tasks scores
  try {
    const userData = await User.findAll({
      where: {
        crew_id: req.params.id
      },
    })
    
    const userIds = userData.map((user) => user.id)

    const updatedUsers = await User.update(
      { task_completed: sequelize.literal('task_completed + 1') },
      {  where: {
        id: {
          [Op.in]: userIds,
        },
      } 
    })

    if (!updatedUsers) {
      res.status(404).json({ message: 'No users found!' })
    }

    res.status(200).json(updatedUsers)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

userRoutes.get('/:id', withAuth, async (req, res) => {
  //Gets one project by ID
  try {
    const userData = await User.findByPk(req.params.id, {include: [
      {
        model: Crew,
        attributes: ['crew_number'],
      },
    ]})

    if (!userData) {
      res.status(404).json({ message: 'No user found with this ID!' })
      return
    }

    res.status(200).json(userData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

userRoutes.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body)

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.logged_in = true
      req.session.auth = { is_manager: userData.is_manager, is_supervisor: userData.is_supervisor}

      res.status(200).json(userData)
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

userRoutes.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } })

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' })
      return
    }

    const validPassword = await userData.checkPassword(req.body.password)

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' })
      return
    }

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.logged_in = true
      req.session.auth = { is_manager: userData.is_manager, is_supervisor: userData.is_supervisor}

      res.json({ user: userData, message: 'You are now logged in!' })
    })

  } catch (err) {
    res.status(500).json(err)
  }
})

userRoutes.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

userRoutes.put('/:id', withAuth, async (req, res) => {
  // update a project's data by its `id` value
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    if (!updatedUser) {
      res.status(404).json({ message: 'No user found with this id!' })
      return
    }
    
    res.status(200).json(updatedUser)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }  
})

userRoutes.delete('/:id', withAuth, async (req, res) => {
  // deletes project by its `id` value
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!deletedUser) {
      res.status(404).json({ message: 'No user found with this id!' })
      return
    }

    res.status(200).json(`${deletedUser} User deleted!`)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})