const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class CreateResultRouter {
  constructor ({ createUseCase } = {}) {
    this.createUseCase = createUseCase
  }

  async route (httpRequest) {
    try {
      const { testId, orderTask, timeTask, aborted, clicks } = httpRequest.body
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
      if (typeof clicks !== 'number') {
        return HttpResponse.badRequest(new MissingParamError('clicks'))
      }

      const result = await this.createUseCase.create({ testId, orderTask, timeTask, aborted, clicks })

      return HttpResponse.created({ result })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
