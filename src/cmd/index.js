import startServer from './appServer'
import startMongoConnection from './mongoConnection'

const execute = async () => {
  await startMongoConnection()
  startServer()
}

export default execute