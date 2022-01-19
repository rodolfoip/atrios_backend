module.exports = class ExistentParamError extends Error {
  constructor (paramName) {
    super(`Param has existent: ${paramName}`)
    this.name = 'ExistentParamError'
  }
}
