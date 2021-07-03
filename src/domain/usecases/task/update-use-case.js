const { MissingParamError } = require('../../../utils/errors')

module.exports = class UpdateUseCase {
  constructor ({ usabilityTestRepository } = {}) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async update ({ testId, order, description, sus, affectGrid }) {
    if (!testId) {
      throw new MissingParamError('testId')
    }
    if (!order) {
      throw new MissingParamError('order')
    }

    const usabilityTest = await this.usabilityTestRepository.findById(testId)
    let updatedTask = {}

    usabilityTest.tasks.map((task) => {
      if (task.order === order) {
        task.description = description ?? task.description
        task.sus = sus ?? task.sus
        task.affectGrid = affectGrid ?? task.affectGrid
        updatedTask = task
      }
      return task
    })
    await this.usabilityTestRepository.update(usabilityTest)
    return updatedTask
  }
}
