module.exports = class MissingParamError extends Error {
  constructor (paramName) {
    super(`É necessário enviar o parâmetro: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
