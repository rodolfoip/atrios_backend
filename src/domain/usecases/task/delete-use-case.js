const { MissingParamError } = require('../../../utils/errors')

module.exports = class DeleteUseCase {
  constructor ({ usabilityTestRepository } = {}) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async delete ({ testId, order }) {
    if (!testId) {
      throw new MissingParamError('testId')
    }
    if (!order) {
      throw new MissingParamError('order')
    }

    const usabilityTest = await this.usabilityTestRepository.findById(testId)
    usabilityTest.tasks.map((task, index) => {
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
