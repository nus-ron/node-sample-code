import HttpStatus from 'http-status-codes'

import CustomError from '@common/CustomError'

export const WrongLoginError = new CustomError(
  'Wrong email or password',
  2001,
  HttpStatus.NOT_ACCEPTABLE,
)

export const VerificationNotFoundError = new CustomError(
  'Verification token not found or expired',
  2002,
  HttpStatus.NOT_FOUND,
)

export const UnverifiedError = new CustomError(
  'The user is not verified yet',
  2003,
  HttpStatus.NOT_ACCEPTABLE,
)

export const VerificationEmailNotFoundError = new CustomError(
  'The email address doesn\'t exist or already verified',
  2004,
  HttpStatus.NOT_FOUND,
)