const UsabilityTest = require('../../../domain/models/usability-test')
const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class FindByNameUsabilityTestRouter {
  constructor ({ findByNameUseCase } = {}) {
    this.findByNameUseCase = findByNameUseCase
  }

  async route (httpRequest) {
    try {
      if (!httpRequest.body.userId) {
        return HttpResponse.badRequest(new MissingParamError('userId'))
      }
      if (!httpRequest.body.name) {
        return HttpResponse.badRequest(new MissingParamError('name'))
      }

      const { _id, name, accessCode, prototypeLink, externalLink, userId, tasks } = await this.findByNameUseCase.find(httpRequest.body.userId, httpRequest.body.name)
      const usabilityTest = new UsabilityTest(_id, name, accessCode, prototypeLink, externalLink, userId, tasks)
      return HttpResponse.ok({ usabilityTest })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
