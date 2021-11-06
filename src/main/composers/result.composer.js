const { CreateUseCase } = require('../../domain/usecases/result')
const ResultRepository = require('../../infra/repositories/result-repository')
const { CreateResultRouter } = require('../../presentation/routers/result/')

module.exports = class CreateTaskRouterComposer {
  static compose () {
    const resultRepository = new ResultRepository()
    const createUseCase = new CreateUseCase({
      resultRepository
    })

    return new CreateResultRouter({
      createUseCase
    })
  }
}
