const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class CreateResultRouter {
  constructor ({ addTaskUseCase } = {}) {
    this.addTaskUseCase = addTaskUseCase
  }

  async route (httpRequest) {
    try {
      const { _id, orderTask, timeTask, aborted } = httpRequest.body
      if (!_id) {
        return HttpResponse.badRequest(new MissingParamError('_id'))
      }
      if (!orderTask) {
        return HttpResponse.badRequest(new MissingParamError('orderTask'))
      }
      if (!timeTask) {
        return HttpResponse.badRequest(new MissingParamError('timeTask'))
      }
      if (!aborted) {
        return HttpResponse.badRequest(new MissingParamError('aborted'))
      }

      const result = await this.addTaskUseCase.addTask({ _id, orderTask, timeTask, aborted })

      return HttpResponse.updated({ result })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
