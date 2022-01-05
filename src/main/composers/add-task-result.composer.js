const { AddTaskUseCase } = require('../../domain/usecases/result')
const ResultRepository = require('../../infra/repositories/result-repository')
const { AddTaskResultRouter } = require('../../presentation/routers/result/')

module.exports = class UpdateRouterComposer {
  static compose () {
    const resultRepository = new ResultRepository()
    const addTaskUseCase = new AddTaskUseCase({
      resultRepository
    })

    return new AddTaskResultRouter({
      addTaskUseCase
    })
  }
}
