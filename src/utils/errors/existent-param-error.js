module.exports = class ExistentParamError extends Error {
  constructor (paramName) {
    super(`O valor do parâmetro [${paramName}] já está sendo utilizado`)
    this.name = 'ExistentParamError'
  }
}
