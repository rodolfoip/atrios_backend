const { CreateUseCase, FindByOrderUseCase } = require('../../domain/usecases/task')
const UsabilityTestRepository = require('../../infra/repositories/usability-test-repository')
const { CreateTaskRouter } = require('../../presentation/routers/task/')

module.exports = class CreateTaskRouterComposer {
  static compose () {
    const usabilityTestRepository = new UsabilityTestRepository()
    const createUseCase = new CreateUseCase({
      usabilityTestRepository
    })
    const findByOrderUseCase = new FindByOrderUseCase({
      usabilityTestRepository
    })

    return new CreateTaskRouter({
      createUseCase,
      findByOrderUseCase
    })
  }
}
