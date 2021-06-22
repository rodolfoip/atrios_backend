const { MissingParamError, InvalidParamError } = require('../../utils/errors')
const HttpResponse = require('../helpers/http-response')

module.exports = class CreateUserRoute {
  constructor ({ createUseCase, emailValidator } = {}) {
    this.createUseCase = createUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { name, email, password } = httpRequest.body
      if (!name) {
        return HttpResponse.badRequest(new MissingParamError('name'))
      }
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }

      const user = await this.createUseCase.create({ name, email, password })

      return HttpResponse.created({ user })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
