import { Router } from 'express'
import { homeRoutes } from './homeRoutes.js'
import { adminRoutes } from './adminRoutes.js'
import { apiIndex } from './api/index.js'
import { dashboardRoutes } from './dashboardRoutes.js'
import { withAuth } from '../utils/auth.js'

export const routes = Router()

routes.use('/', homeRoutes)
routes.use('/dashboard', withAuth, dashboardRoutes)
routes.use('/admin', adminRoutes)
routes.use('/api', apiIndex)

