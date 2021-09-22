const { FindByIdUseCase } = require('../../domain/usecases/usability-test')
const UsabilityTestRepository = require('../../infra/repositories/usability-test-repository')
const { FindByIdUsabilityTestRouter } = require('../../presentation/routers/usability-test')

module.exports = class FindByIdRouterComposer {
  static compose () {
    const usabilityTestRepository = new UsabilityTestRepository()
    const findByIdUseCase = new FindByIdUseCase({
      usabilityTestRepository
    })

    return new FindByIdUsabilityTestRouter({
      findByIdUseCase
    })
  }
}
