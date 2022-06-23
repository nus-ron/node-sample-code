import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'

import { apiRouter } from '@root/routers'

import {
  morganSuccess,
  morganError,
  addRequestId,
  getRequestIp,
} from '@root/middlewares'

const app = express()

const server = http.Server(app)

app.use(addRequestId)
app.use(getRequestIp)
app.use(morganSuccess)
app.use(morganError)
app.use(cors())
app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

app.use('/api', apiRouter)

app.use((error, req, res, _next) => {
  error.status = error.status || 500
  res.status(error.status)
  const errorCode = error.code

  console.log(error)

  res.status(error.status).json({
    errorCode,
    errorMsg: error.message,
  })
})

app.use(function (req, res) {
  res.status(404).json({
    errorMsg: 'Page does not exist',
  })
})

const startServer = async () => {
  try {
    const port = process.env.PORT || 5000
    server.listen(port, () => console.log(`Server started on port ${port}`))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export default startServer
