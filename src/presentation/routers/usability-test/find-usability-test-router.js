const UsabilityTest = require('../../../domain/models/usability-test')
const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class FindUsabilityTestRouter {
  constructor ({ findUseCase } = {}) {
    this.findUseCase = findUseCase
  }

  async route (httpRequest) {
    try {
      if (!httpRequest.params.userId) {
        return HttpResponse.badRequest(new MissingParamError('userId'))
      }
      const usabilityTests = await this.findUseCase.find(httpRequest.params.userId)
      const list = usabilityTests.map(({ _id, name, accessCode, prototypeLink, externalLink, userId, tasks }) => {
        return new UsabilityTest(_id, name, accessCode, prototypeLink, externalLink, userId, tasks)
      })
      return HttpResponse.ok({ list })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
