const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class UpdateTaskRouter {
  constructor ({ updateUseCase } = {}) {
    this.updateUseCase = updateUseCase
  }

  async route (httpRequest) {
    try {
      const { userId, testId, actualOrder, newOrder, description, sus, affectGrid, aborted } = httpRequest.body
      if (!userId) {
        return HttpResponse.badRequest(new MissingParamError('userId'))
      }
      if (!testId) {
        return HttpResponse.badRequest(new MissingParamError('testId'))
      }
      if (!actualOrder) {
        return HttpResponse.badRequest(new MissingParamError('actualOrder'))
      }

      const task = await this.updateUseCase.update({ userId, testId, actualOrder, newOrder, description, sus, affectGrid, aborted })

      return HttpResponse.updated({ task })
    } catch (error) {
      return HttpResponse.serverError(error)
    }
  }
}
