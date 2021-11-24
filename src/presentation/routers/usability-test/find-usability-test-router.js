const UsabilityTest = require('../../../domain/models/usability-test')
const HttpResponse = require('../../helpers/http-response')

module.exports = class FindUsabilityTestRouter {
  constructor ({ findUseCase } = {}) {
    this.findUseCase = findUseCase
  }

  async route (httpRequest) {
    try {
      const usabilityTests = await this.findUseCase.find()
      const list = usabilityTests.map(({ _id, name, accessCode, prototypeLink, externalLink, userId, tasks }) => {
        return new UsabilityTest(_id, name, accessCode, prototypeLink, externalLink, userId, tasks)
      })
      return HttpResponse.ok({ list })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
