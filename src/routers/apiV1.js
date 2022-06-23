import { Router } from 'express'
import authRouter from '@modules/auth/router'

const apiV1Router = Router()

apiV1Router.get('/ping', (_, res) => {
  res.json({ msg: 'pong' })
})

apiV1Router.use('/auth', authRouter)

export default apiV1Router