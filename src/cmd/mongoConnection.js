import mongoose from 'mongoose'

const startMongoConnection = async () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  const env = process.env.NODE_ENV || 'development'
  const debug = ['development', 'staging'].includes(env)
  mongoose.set('debug', debug)

  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'))

  await db.once('open', () => {
    console.log('connect to mongodb')
  })
}

export default startMongoConnection