const Result = require('../../../domain/models/result')
const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class FindByTestIdResultRouter {
  constructor ({ findByTestIdUseCase } = {}) {
    this.findByTestIdUseCase = findByTestIdUseCase
  }

  async route (httpRequest) {
    try {
      if (!httpRequest.params.testId) {
        return HttpResponse.badRequest(new MissingParamError('testId'))
      }

      const { _id, testId, tasks, sus, affectGrid } = await this.findByTestIdUseCase.findByTestId(httpRequest.params.testId)
      const result = new Result(_id, testId, tasks, sus, affectGrid)
      return HttpResponse.ok({ result })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
