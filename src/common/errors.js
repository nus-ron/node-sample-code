import HttpStatus from 'http-status-codes'

import CustomError from './CustomError'

export const UnexpectError = (message) =>
  new CustomError(message, 9999, HttpStatus.INTERNAL_SERVER_ERROR)

export const UnauthorizedError = new CustomError(
  'Unauthorized',
  1001,
  HttpStatus.UNAUTHORIZED,
)

export const ValidationError = (message) =>
  new CustomError(message, 1002, HttpStatus.UNPROCESSABLE_ENTITY)