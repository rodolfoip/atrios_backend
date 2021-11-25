const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class DeleteTaskRouter {
  constructor ({ deleteUseCase } = {}) {
    this.deleteUseCase = deleteUseCase
  }

  async route (httpRequest) {
    try {
      const { userId, testId, order } = httpRequest.body
      if (!userId) {
        return HttpResponse.badRequest(new MissingParamError('userId'))
      }
      if (!testId) {
        return HttpResponse.badRequest(new MissingParamError('testId'))
      }
      if (!order) {
        return HttpResponse.badRequest(new MissingParamError('order'))
      }

      const task = await this.deleteUseCase.delete({ userId, testId, order })

      return HttpResponse.deleted({ task })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
