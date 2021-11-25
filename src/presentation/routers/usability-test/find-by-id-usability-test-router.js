const UsabilityTest = require('../../../domain/models/usability-test')
const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class FindByNameUsabilityTestRouter {
  constructor ({ findByIdUseCase } = {}) {
    this.findByIdUseCase = findByIdUseCase
  }

  async route (httpRequest) {
    try {
      if (!httpRequest.body.userId) {
        return HttpResponse.badRequest(new MissingParamError('userId'))
      }
      if (!httpRequest.body.id) {
        return HttpResponse.badRequest(new MissingParamError('id'))
      }

      const { _id, name, accessCode, prototypeLink, externalLink, userId, tasks } = await this.findByIdUseCase.find(httpRequest.body.userId, httpRequest.body.id)
      const usabilityTest = new UsabilityTest(_id, name, accessCode, prototypeLink, externalLink, userId, tasks)
      return HttpResponse.ok({ usabilityTest })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
