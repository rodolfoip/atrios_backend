const { MissingParamError } = require('../../../utils/errors')

module.exports = class UpdateUseCase {
  constructor ({ usabilityTestRepository } = {}) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async update ({ userId, testId, actualOrder, newOrder, description, sus, affectGrid, aborted }) {
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (!testId) {
      throw new MissingParamError('testId')
    }
    if (!actualOrder) {
      throw new MissingParamError('actualOrder')
    }

    const usabilityTest = await this.usabilityTestRepository.findById(userId, testId)
    let updatedTask = {}


    usabilityTest.tasks.map((task) => {
      if (task.order == newOrder) {
        task.order = actualOrder
        return task
      }

      if (task.order == actualOrder) {
        task.order = newOrder ?? task.order
        task.description = description ?? task.description
        task.sus = sus ?? task.sus
        task.affectGrid = affectGrid ?? task.affectGrid
        task.aborted = aborted ?? task.aborted
        updatedTask = task
      }
      return task
    })

    usabilityTest.tasks.sort((prevTask, nextTask) => prevTask.order - nextTask.order)

    await this.usabilityTestRepository.update(usabilityTest)
    return updatedTask
  }
}
