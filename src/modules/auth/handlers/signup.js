import HttpStatus from 'http-status-codes'
import bcrypt from 'bcryptjs'

import userRepo from '@modules/user/repository'
import { respondSuccess } from '@common/responses'
import sendVerificationEmail from './sendVerificationEmail'
import { generateRandomToken } from '@common/helpers'

export default async (req, res, next) => {

  let { email, password, name } = req.validatedBody

  const salt = await bcrypt.genSalt()
  password = await bcrypt.hash(password, salt)
  const verificationToken = generateRandomToken()

  const user = await userRepo.create({ email, password, name, verificationToken })

  await sendVerificationEmail(user)

  respondSuccess(res, HttpStatus.OK, {
    ...user.toJSON()
  })
}
