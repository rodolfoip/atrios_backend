const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../helpers/http-response')

module.exports = class DeleteUsabilityTestRouter {
  constructor ({ deleteUseCase } = {}) {
    this.deleteUseCase = deleteUseCase
  }

  async route (httpRequest) {
    try {
      const { userId, id } = httpRequest.body
      if (!userId) {
        return HttpResponse.badRequest(new MissingParamError('userId'))
      }
      if (!id) {
        return HttpResponse.badRequest(new MissingParamError('id'))
      }

      const isDeleted = await this.deleteUseCase.delete(userId, id)
      return HttpResponse.deleted({ isDeleted })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
