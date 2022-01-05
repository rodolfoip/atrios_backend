const { MissingParamError } = require('../../../utils/errors')

module.exports = class AddTaskUseCase {
  constructor ({ resultRepository } = {}) {
    this.resultRepository = resultRepository
  }

  async addTask ({ _id, orderTask, timeTask, aborted }) {
    if (!_id) {
      throw new MissingParamError('_id')
    }
    if (!orderTask) {
      throw new MissingParamError('orderTask')
    }
    if (!timeTask.length) {
      throw new MissingParamError('timeTask')
    }
    if (typeof aborted !== 'boolean') {
      throw new MissingParamError('aborted')
    }

    const newResult = await this.resultRepository.addTask({ _id, orderTask, timeTask, aborted })
    return newResult
  }
}
