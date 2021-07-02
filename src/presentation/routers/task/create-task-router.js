const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class CreateTaskRouter {
  constructor ({ createUseCase } = {}) {
    this.createUseCase = createUseCase
  }

  async route (httpRequest) {
    try {
      const { _idTest, order, description } = httpRequest.body
      if (!_idTest) {
        return HttpResponse.badRequest(new MissingParamError('_idTest'))
      }
      if (!order) {
        return HttpResponse.badRequest(new MissingParamError('order'))
      }
      if (!description) {
        return HttpResponse.badRequest(new MissingParamError('description'))
      }

      const task = await this.createUseCase.create({ _idTest, order, description })

      return HttpResponse.created({ task })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
