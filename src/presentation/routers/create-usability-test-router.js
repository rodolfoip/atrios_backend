const { MissingParamError } = require('../../utils/errors')
const HttpResponse = require('../helpers/http-response')

module.exports = class CreateUsabilityTestRouter {
  constructor ({ createUseCase } = {}) {
    this.createUseCase = createUseCase
  }

  async route (httpRequest) {
    try {
      const { name, accessCode, prototypeLink, externalLink } = httpRequest.body
      if (!name) {
        return HttpResponse.badRequest(new MissingParamError('name'))
      }
      if (!accessCode) {
        return HttpResponse.badRequest(new MissingParamError('accessCode'))
      }
      if (!prototypeLink) {
        return HttpResponse.badRequest(new MissingParamError('prototypeLink'))
      }
      if (!externalLink) {
        return HttpResponse.badRequest(new MissingParamError('externalLink'))
      }

      const usabilityTest = await this.createUseCase.create({ name, accessCode, prototypeLink, externalLink })

      return HttpResponse.created({ usabilityTest })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
