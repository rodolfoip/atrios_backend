const { MissingParamError } = require('../../utils/errors')
const HttpResponse = require('../helpers/http-response')

module.exports = class CreateUsabilityTestRouter {
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
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
