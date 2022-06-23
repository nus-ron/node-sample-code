const generateRandomToken = () => {
  return require('crypto').randomBytes(32).toString('hex')
}

export {
  generateRandomToken
}