const { FindByNameUseCase } = require('../../domain/usecases/usability-test')
const UsabilityTestRepository = require('../../infra/repositories/usability-test-repository')
const { FindByNameUsabilityTestRouter } = require('../../presentation/routers/usability-test')

module.exports = class FindUserRouterComposer {
  static compose () {
    const usabilityTestRepository = new UsabilityTestRepository()
    const findByNameUseCase = new FindByNameUseCase({
      usabilityTestRepository
    })

    return new FindByNameUsabilityTestRouter({
      findByNameUseCase
    })
  }
}
