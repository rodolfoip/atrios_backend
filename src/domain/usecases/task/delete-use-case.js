const { MissingParamError } = require('../../../utils/errors')

module.exports = class DeleteUseCase {
  constructor ({ usabilityTestRepository } = {}) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async delete ({ userId, testId, order }) {
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (!testId) {
      throw new MissingParamError('testId')
    }
    if (!order) {
      throw new MissingParamError('order')
    }

    const usabilityTest = await this.usabilityTestRepository.findById(userId, testId)
    usabilityTest.tasks = usabilityTest.tasks.filter((task, index) => {
      let newTask
      if (task.order !== order) {
        task.order = (index + 1)
        newTask = task
      }
      return newTask
    })
    await this.usabilityTestRepository.update(usabilityTest)
  }
}
