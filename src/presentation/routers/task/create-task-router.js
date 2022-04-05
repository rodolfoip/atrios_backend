const { MissingParamError, ExistentParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class CreateTaskRouter {
  constructor ({ createUseCase, findByOrderUseCase } = {}) {
    this.createUseCase = createUseCase
    this.findByOrderUseCase = findByOrderUseCase
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
      if (await this.findByOrderUseCase.find(userId, testId, order)) {
        return HttpResponse.conflict(new ExistentParamError('order'))
      }

      const task = await this.createUseCase.create({ userId, testId, order, description, sus, affectGrid })

      return HttpResponse.created({ task })
    } catch (error) {
      return HttpResponse.serverError(error)
    }
  }
}
