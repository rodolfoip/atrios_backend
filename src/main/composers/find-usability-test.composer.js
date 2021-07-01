const { FindUseCase } = require('../../domain/usecases/usability-test')
const UsabilityTestRepository = require('../../infra/repositories/usability-test-repository')
const FindUsabilityTestRouter = require('../../presentation/routers/find-usability-test-router')

module.exports = class FindUserRouterComposer {
  static compose () {
    const usabilityTestRepository = new UsabilityTestRepository()
    const findUseCase = new FindUseCase({
      usabilityTestRepository
    })

    return new FindUsabilityTestRouter({
      findUseCase
    })
  }
}
