const UsabilityTest = require('../../../domain/models/usability-test')
const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class FindByNameUsabilityTestRouter {
  constructor ({ findByIdUseCase } = {}) {
    this.findByIdUseCase = findByIdUseCase
  }

  async route (httpRequest) {
    try {
      if (!httpRequest.params.id) {
        return HttpResponse.badRequest(new MissingParamError('id'))
      }

      const { _id, name, accessCode, prototypeLink, externalLink, tasks } = await this.findByIdUseCase.find(httpRequest.params.id)
      const usabilityTest = new UsabilityTest(_id, name, accessCode, prototypeLink, externalLink, tasks)
      return HttpResponse.ok({ usabilityTest })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
