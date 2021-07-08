const { FindByAccessCodeUseCase } = require('../../domain/usecases/usability-test')
const UsabilityTestRepository = require('../../infra/repositories/usability-test-repository')
const { FindByAccessCodeUsabilityTestRouter } = require('../../presentation/routers/usability-test')

module.exports = class FindByAccessCodeRouterComposer {
  static compose () {
    const usabilityTestRepository = new UsabilityTestRepository()
    const findByAccessCodeUseCase = new FindByAccessCodeUseCase({
      usabilityTestRepository
    })

    return new FindByAccessCodeUsabilityTestRouter({
      findByAccessCodeUseCase
    })
  }
}
