import { Router } from 'express'
import apiV1Router from './apiV1'
import passport from 'passport'
require('@modules/auth/utils/passport')

const apiRouter = Router()

apiRouter.use(passport.initialize())
apiRouter.use('/v1', apiV1Router)

export { apiRouter }