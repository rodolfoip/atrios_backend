const { MissingParamError } = require('../../utils/errors')
const HttpResponse = require('../helpers/http-response')

module.exports = class DeleteUsabilityTestRouter {
  constructor ({ deleteUseCase } = {}) {
    this.deleteUseCase = deleteUseCase
  }

  async route (httpRequest) {
    try {
      const id = httpRequest.body.id
      if (!id) {
        return HttpResponse.badRequest(new MissingParamError('id'))
      }

      const isDeleted = await this.deleteUseCase.delete(id)
      return HttpResponse.deleted({ isDeleted })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
