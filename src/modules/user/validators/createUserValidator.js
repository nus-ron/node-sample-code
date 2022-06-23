import { ValidationError } from '@common/errors'
import Joi from 'joi'

const createUserSchema = Joi.object({
  email: Joi.string().email().required().trim().lowercase(),
  password: Joi.string()
    .regex(/^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must have at least 8 chars, include uppercase, number and special character'
    }),
  name: Joi.string()
    .min(2)
    .required(),
})


export default async (req, res, next) => {
  try {
    let { email, password, name } = req.body

    req.validatedBody = await createUserSchema.validateAsync({
      email,
      password,
      name
    }, { convert: true})

    next()
  } catch (err) {
    throw ValidationError(err)
  }
}
