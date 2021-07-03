const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class UpdateTaskRouter {
  constructor ({ updateUseCase } = {}) {
    this.updateUseCase = updateUseCase
  }

  async route (httpRequest) {
    try {
      const { testId, order, description, sus, affectGrid } = httpRequest.body
      if (!testId) {
        return HttpResponse.badRequest(new MissingParamError('testId'))
      }
      if (!order) {
        return HttpResponse.badRequest(new MissingParamError('order'))
      }

      const task = await this.updateUseCase.update({ testId, order, description, sus, affectGrid })

      return HttpResponse.updated({ task })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
