const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class CreateTaskRouter {
  constructor ({ createUseCase } = {}) {
    this.createUseCase = createUseCase
  }

  async route (httpRequest) {
    try {
      const { testId, order, description } = httpRequest.body
      if (!testId) {
        return HttpResponse.badRequest(new MissingParamError('testId'))
      }
      if (!order) {
        return HttpResponse.badRequest(new MissingParamError('order'))
      }
      if (!description) {
        return HttpResponse.badRequest(new MissingParamError('description'))
      }

      const task = await this.createUseCase.create({ testId, order, description })

      return HttpResponse.created({ task })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
