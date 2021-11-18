const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class CreateResultRouter {
  constructor ({ updateUseCase } = {}) {
    this.updateUseCase = updateUseCase
  }

  async route (httpRequest) {
    try {
      const { _id, sus, affectGrid } = httpRequest.body
      if (!_id) {
        return HttpResponse.badRequest(new MissingParamError('_id'))
      }

      const result = await this.updateUseCase.update({ _id, sus, affectGrid })

      return HttpResponse.updated({ result })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
