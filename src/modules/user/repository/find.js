import { User } from '@common/models'

const find = async (id) => {
  return await User.findById(id).exec()
}

const findOneByCondition = async (condition) => {
  return await User.findOne(condition)
}

export { find, findOneByCondition }
