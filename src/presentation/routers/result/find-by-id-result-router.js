const Result = require('../../../domain/models/result')
const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class CreateResultRouter {
  constructor ({ findByIdUseCase } = {}) {
    this.findByIdUseCase = findByIdUseCase
  }

  async route (httpRequest) {
    try {
      if (!httpRequest.params.id) {
        return HttpResponse.badRequest(new MissingParamError('id'))
      }

      const { _id, testId, tasks, sus, affectGrid } = await this.findByIdUseCase.findById(httpRequest.params.id)
      const result = new Result(_id, testId, tasks, sus, affectGrid)
      return HttpResponse.ok({ result })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
