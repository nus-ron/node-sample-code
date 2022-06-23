export default class CustomError extends Error {
  constructor(message, code, status) {
    super(message)

    this.name = this.constructor.name
    this.status = status
    this.code = code
  }
}