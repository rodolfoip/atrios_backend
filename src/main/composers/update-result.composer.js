const { UpdateUseCase } = require('../../domain/usecases/result')
const ResultRepository = require('../../infra/repositories/result-repository')
const { UpdateResultRouter } = require('../../presentation/routers/result/')

module.exports = class UpdateRouterComposer {
  static compose () {
    const resultRepository = new ResultRepository()
    const updateUseCase = new UpdateUseCase({
      resultRepository
    })

    return new UpdateResultRouter({
      updateUseCase
    })
  }
}
