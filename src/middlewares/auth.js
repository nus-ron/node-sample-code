import passport from 'passport'

export const auth = async (req, res, next) => {
  return passport.authenticate(
    'jwt',
    {
      session: false,
    },
    (err, user, info) => {
      if (err) {
        return next(err)
      }

      req.user = user
      next()
    },
  )(req, res, next)
}