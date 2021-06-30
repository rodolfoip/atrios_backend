const { DeleteUseCase } = require('../../domain/usecases/usability-test')
const UsabilityTestRepository = require('../../infra/repositories/usability-test-repository')
const DeleteUsabilityTestRouter = require('../../presentation/routers/delete-usability-test-router')

module.exports = class DeleteUserRouterComposer {
  static compose () {
    const usabilityTestRepository = new UsabilityTestRepository()
    const deleteUseCase = new DeleteUseCase({
      usabilityTestRepository
    })

    return new DeleteUsabilityTestRouter({
      deleteUseCase
    })
  }
}
