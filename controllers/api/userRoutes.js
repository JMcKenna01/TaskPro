import { Router } from 'express'
import { User } from '../../models/User.js'
import { Crew } from '../../models/Crew.js'
import { withAuth } from '../../utils/auth.js'

export const userRoutes = Router()

userRoutes.get('/',  withAuth, async (req, res) => {
  //Gets all projects
  try {
    const userData = await User.findAll({attributes: {exclude: ['password']},include: [
      {
        model: Crew,
        attributes: ['crew_number'],
      },
    ]})

    if (!userData) {
      res.status(404).json({ message: 'No users found!' });
      return;
    }

    res.status(200).json(userData)

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
      res.status(404).json({ message: 'No user found with this ID!' });
      return;
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

userRoutes.put('/:id',  withAuth, async (req, res) => {
  // update a project's data by its `id` value
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    if (!updatedUser) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
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
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(`${deletedUser} User deleted!`)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})