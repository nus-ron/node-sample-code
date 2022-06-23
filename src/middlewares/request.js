import expressRequestId from 'express-request-id'

export const addRequestId = expressRequestId()

export const getRequestIp = (req, _res, next) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  if (ip.substr(0, 7) === '::ffff:') {
    ip = ip.substr(7)
  }
  req.ipAddress = ip
  next()
}