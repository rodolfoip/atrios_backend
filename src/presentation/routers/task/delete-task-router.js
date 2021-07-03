const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class DeleteTaskRouter {
  constructor ({ deleteUseCase } = {}) {
    this.deleteUseCase = deleteUseCase
  }

  async route (httpRequest) {
    try {
      const { testId, order } = httpRequest.body
      if (!testId) {
        return HttpResponse.badRequest(new MissingParamError('testId'))
      }
      if (!order) {
        return HttpResponse.badRequest(new MissingParamError('order'))
      }

      const task = await this.deleteUseCase.delete({ testId, order })

      return HttpResponse.deleted({ task })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
