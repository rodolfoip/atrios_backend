module.exports = class InvalidParamError extends Error {
  constructor (paramName) {
    super(`O parâmetro [${paramName}] é inválido`)
    this.name = 'InvalidParamError'
  }
}
