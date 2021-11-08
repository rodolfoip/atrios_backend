const { FindByIdUseCase } = require('../../domain/usecases/result')
const ResultRepository = require('../../infra/repositories/result-repository')
const { FindByIdResultRouter } = require('../../presentation/routers/result/')

module.exports = class FindByIdResultRouterComposer {
  static compose () {
    const resultRepository = new ResultRepository()
    const findByIdUseCase = new FindByIdUseCase({
      resultRepository
    })

    return new FindByIdResultRouter({
      findByIdUseCase
    })
  }
}
