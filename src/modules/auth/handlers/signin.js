const passport = require('passport')
import HttpStatus from 'http-status-codes'

import { respondSuccess } from '@common/responses'
import { generateJWT } from '../utils/jwtHelper'
import { UnverifiedError } from '../errors'

export default async (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user) => {
    if (err || !user) {
      return next(err)
    }

    if (!user.verified) {
      next(UnverifiedError)
      return
    }

    respondSuccess(res, HttpStatus.OK, {
      ...user.toJSON(),
      accessToken: await generateJWT(user)
    })
  })(req, res, next)
}
