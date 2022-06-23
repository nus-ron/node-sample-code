import HttpStatus from 'http-status-codes'

import { respondSuccess } from '@common/responses'
import userRepo from '@modules/user/repository'
import { VerificationNotFoundError } from '../errors'
import { generateJWT } from '../utils/jwtHelper'

export default async (req, res, next) => {
  let user = await userRepo.findOneByCondition({ verificationToken: req.body.token})

  if (!user) {
    next(VerificationNotFoundError)
    return
  }

  user = await userRepo.verifyEmail(user)
  respondSuccess(res, HttpStatus.OK, {
    ...user.toJSON(),
    accessToken: await generateJWT(user)
  })
}