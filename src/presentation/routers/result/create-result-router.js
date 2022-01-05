const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class CreateResultRouter {
  constructor ({ createUseCase } = {}) {
    this.createUseCase = createUseCase
  }

  async route (httpRequest) {
    try {
      const { testId, orderTask, timeTask, aborted } = httpRequest.body
      if (!testId) {
        return HttpResponse.badRequest(new MissingParamError('testId'))
      }
      if (!orderTask) {
        return HttpResponse.badRequest(new MissingParamError('orderTask'))
      }
      if (!timeTask.length) {
        return HttpResponse.badRequest(new MissingParamError('timeTask'))
      }
      if (typeof aborted !== 'boolean') {
        return HttpResponse.badRequest(new MissingParamError('aborted'))
      }

      const result = await this.createUseCase.create({ testId, orderTask, timeTask, aborted })

      return HttpResponse.created({ result })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
