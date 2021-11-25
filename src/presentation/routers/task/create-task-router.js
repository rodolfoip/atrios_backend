const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class CreateTaskRouter {
  constructor ({ createUseCase } = {}) {
    this.createUseCase = createUseCase
  }

  async route (httpRequest) {
    try {
      const { userId, testId, order, description, sus, affectGrid } = httpRequest.body
      if (!userId) {
        return HttpResponse.badRequest(new MissingParamError('userId'))
      }
      if (!testId) {
        return HttpResponse.badRequest(new MissingParamError('testId'))
      }
      if (!order) {
        return HttpResponse.badRequest(new MissingParamError('order'))
      }
      if (!description) {
        return HttpResponse.badRequest(new MissingParamError('description'))
      }

      const task = await this.createUseCase.create({ userId, testId, order, description, sus, affectGrid })

      return HttpResponse.created({ task })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
