const { MissingParamError } = require('../../utils/errors')
const HttpResponse = require('../helpers/http-response')

module.exports = class UpdateUsabilityTestRouter {
  constructor ({ updateUseCase } = {}) {
    this.updateUseCase = updateUseCase
  }

  async route (httpRequest) {
    try {
      const { _id, name, accessCode, prototypeLink, externalLink } = httpRequest.body
      if (!_id) {
        return HttpResponse.badRequest(new MissingParamError('id'))
      }
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

      const usabilityTest = await this.updateUseCase.update({ _id, name, accessCode, prototypeLink, externalLink })
      return HttpResponse.updated({ usabilityTest })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
