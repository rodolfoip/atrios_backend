const { UpdateUseCase } = require('../../domain/usecases/usability-test')
const UsabilityTestRepository = require('../../infra/repositories/usability-test-repository')
const { UpdateUsabilityTestRouter } = require('../../presentation/routers/usability-test')

module.exports = class UpdateUserRouterComposer {
  static compose () {
    const usabilityTestRepository = new UsabilityTestRepository()
    const updateUseCase = new UpdateUseCase({
      usabilityTestRepository
    })

    return new UpdateUsabilityTestRouter({
      updateUseCase
    })
  }
}
