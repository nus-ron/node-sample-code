import HttpStatus from 'http-status-codes'

import { respondSuccess } from '@common/responses'
import userRepo from '@modules/user/repository'
import { VerificationEmailNotFoundError } from '../errors'
import sendVerificationEmail from './sendVerificationEmail'

export default async (req, res, next) => {
  let user = await userRepo.findOneByCondition({ email: req.body.email.trim().toLowerCase()})

  if (!user || user.verified) {
    next(VerificationEmailNotFoundError)
    return
  }

  await sendVerificationEmail(user)

  respondSuccess(res, HttpStatus.OK)
}