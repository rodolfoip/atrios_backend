const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class UpdateUsabilityTestRouter {
  constructor ({ updateUseCase } = {}) {
    this.updateUseCase = updateUseCase
  }

  async route (httpRequest) {
    try {
      const { _id, name, prototypeLink, externalLink, userId, tasks, quantity } = httpRequest.body
      if (!_id) {
        return HttpResponse.badRequest(new MissingParamError('id'))
      }
      if (!name) {
        return HttpResponse.badRequest(new MissingParamError('name'))
      }
      if (!prototypeLink) {
        return HttpResponse.badRequest(new MissingParamError('prototypeLink'))
      }
      if (!externalLink) {
        return HttpResponse.badRequest(new MissingParamError('externalLink'))
      }
      if (!userId) {
        return HttpResponse.badRequest(new MissingParamError('userId'))
      }

      const usabilityTest = await this.updateUseCase.update({ _id, name, prototypeLink, externalLink, userId, tasks, quantity })
      return HttpResponse.updated({ usabilityTest })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
