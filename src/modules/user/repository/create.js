import { User } from '@common/models'
import { ValidationError } from '@common/errors'

const create = async (userParams) => {
  let user = new User(userParams)

  try {
    await user.save()
  } catch (error) {
    if(error.name === 'MongoError' && error.code === 11000) {
      throw ValidationError('Email address already existed')
    } else {
      throw error
    }
  }
  return user
}

export { create }
