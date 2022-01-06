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

      const results = await this.findByTestIdUseCase.findByTestId(httpRequest.params.testId)
      return HttpResponse.ok({ results })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
