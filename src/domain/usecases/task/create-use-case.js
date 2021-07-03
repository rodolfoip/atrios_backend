const { MissingParamError } = require('../../../utils/errors')
const Task = require('../../models/task')

module.exports = class CreteUseCase {
  constructor ({ usabilityTestRepository } = {}) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async create ({ testId, order, description }) {
    if (!testId) {
      throw new MissingParamError('testId')
    }
    if (!order) {
      throw new MissingParamError('order')
    }
    if (!description) {
      throw new MissingParamError('description')
    }

    const usabilityTest = await this.usabilityTestRepository.findById(testId)
    const task = new Task(order, description)

    usabilityTest.tasks.push(task)
    await this.usabilityTestRepository.update(usabilityTest)
    return task
  }
}
