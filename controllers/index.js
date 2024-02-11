import { Router } from 'express'
import { homeRoutes } from './homeRoutes.js'
import { apiIndex } from './api/index.js'
import { dashboardRoutes } from './dashboardRoutes.js'
import { withAuth } from '../utils/auth.js'

export const routes = Router()

routes.use('/', homeRoutes)
routes.use('/dashboard', withAuth, dashboardRoutes)
routes.use('/api', apiIndex)

