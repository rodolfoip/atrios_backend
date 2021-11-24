const UsabilityTest = require('../../../domain/models/usability-test')
const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class FindByAccessCodeUsabilityTestRouter {
  constructor ({ findByAccessCodeUseCase } = {}) {
    this.findByAccessCodeUseCase = findByAccessCodeUseCase
  }

  async route (httpRequest) {
    try {
      if (!httpRequest.params.accessCode) {
        return HttpResponse.badRequest(new MissingParamError('accessCode'))
      }

      const { _id, name, accessCode, prototypeLink, externalLink, userId, tasks } = await this.findByAccessCodeUseCase.find(httpRequest.params.accessCode)
      const usabilityTest = new UsabilityTest(_id, name, accessCode, prototypeLink, externalLink, userId, tasks)
      return HttpResponse.ok({ usabilityTest })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
