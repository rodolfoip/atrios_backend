const { UpdateUseCase } = require('../../domain/usecases/task')
const UsabilityTestRepository = require('../../infra/repositories/usability-test-repository')
const { UpdateTaskRouter } = require('../../presentation/routers/task/')

module.exports = class UpdateTaskRouterComposer {
  static compose () {
    const usabilityTestRepository = new UsabilityTestRepository()
    const updateUseCase = new UpdateUseCase({
      usabilityTestRepository
    })

    return new UpdateTaskRouter({
      updateUseCase
    })
  }
}
