const { DeleteUseCase } = require('../../domain/usecases/task')
const UsabilityTestRepository = require('../../infra/repositories/usability-test-repository')
const { DeleteTaskRouter } = require('../../presentation/routers/task/')

module.exports = class DeleteTaskRouterComposer {
  static compose () {
    const usabilityTestRepository = new UsabilityTestRepository()
    const deleteUseCase = new DeleteUseCase({
      usabilityTestRepository
    })

    return new DeleteTaskRouter({
      deleteUseCase
    })
  }
}
