const passport = require('passport')
import { Strategy as LocalStrategy } from 'passport-local'
import { ExtractJwt as ExtractJWT, Strategy as JWTStrategy } from 'passport-jwt'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

import bcrypt from 'bcryptjs'
import 'dotenv/config'

import userRepo from '@modules/user/repository'
import { WrongLoginError, UnverifiedError } from '../errors'
import { UnexpectError, UnauthorizedError } from '@common/errors'

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false
    },
    async (req, email, password, done) => {
      try {
        const user = await userRepo.findOneByCondition({ email })

        if (!user) {
          return done(WrongLoginError, false)
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
          return done(WrongLoginError, false)
        }

        return done(null, user)
      } catch (e) {
        return done(UnexpectError(e))
      }
    },
  ),
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await userRepo.find(jwtPayload.id)

        if (!user || Math.floor(user.lastPasswordChangedAt.getTime()/1000) > jwtPayload.iat) {
          return done(UnauthorizedError)
        }

        if (!user.verified) {
          return done(UnverifiedError)
        }

        return done(null, user)
      } catch (error) {
        return done(UnexpectError(error))
      }
    },
  ),
)

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.ROOT_URL}/api/v1/auth/oauth/google/callback`,
    session: false
  },
  function(accessToken, refreshToken, profile, done) {
    return done({accessToken, refreshToken, profile});
  })
)