const { FindByTestIdUseCase } = require('../../domain/usecases/result')
const ResultRepository = require('../../infra/repositories/result-repository')
const { FindByTestIdResultRouter } = require('../../presentation/routers/result')

module.exports = class FindByIdResultRouterComposer {
  static compose () {
    const resultRepository = new ResultRepository()
    const findByTestIdUseCase = new FindByTestIdUseCase({
      resultRepository
    })

    return new FindByTestIdResultRouter({
      findByTestIdUseCase
    })
  }
}
