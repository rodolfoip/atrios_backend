module.exports = class UnauthorizedParamError extends Error {
  constructor (paramName) {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}
