import express from 'express'
import asyncHandler from 'express-async-handler'
import HttpStatus from 'http-status-codes'
const passport = require('passport')

import { createUserValidator } from '@modules/user/validators'
import { signin, signup, verifyEmail, resendVerificationEmail, proceedOauthCallback } from './handlers';
import { auth } from '@root/middlewares'
import { respondSuccess } from '@common/responses'

const authRouter = express.Router();

authRouter.post('/signin', asyncHandler(signin))
authRouter.post('/signup', asyncHandler(createUserValidator), asyncHandler(signup))
authRouter.post('/verify-email', asyncHandler(verifyEmail))
authRouter.post('/resend-verification-email', asyncHandler(resendVerificationEmail))
authRouter.post('/reset-password', asyncHandler())
authRouter.put('/reset-password', asyncHandler())

authRouter.get('/oauth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] }))
authRouter.get('/oauth/google/callback', asyncHandler(proceedOauthCallback))

authRouter.get('/test-jwt', asyncHandler(auth), (req, res, next) => {
  respondSuccess(res, HttpStatus.OK, req.user.toJSON())
})

export default authRouter;
