const { CreateUseCase } = require('../../domain/usecases/usability-test')
const UsabilityTestRepository = require('../../infra/repositories/usability-test-repository')
const { CreateUsabilityTestRouter } = require('../../presentation/routers/usability-test')

module.exports = class CreateUserRouterComposer {
  static compose () {
    const usabilityTestRepository = new UsabilityTestRepository()
    const createUseCase = new CreateUseCase({
      usabilityTestRepository
    })

    return new CreateUsabilityTestRouter({
      createUseCase
    })
  }
}
