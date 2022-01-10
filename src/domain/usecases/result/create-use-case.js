const { MissingParamError } = require('../../../utils/errors')
const Result = require('../../models/result')

module.exports = class CreteUseCase {
  constructor ({ resultRepository } = {}) {
    this.resultRepository = resultRepository
  }

  async create ({ testId, orderTask, timeTask, aborted }) {
    if (!testId) {
      throw new MissingParamError('testId')
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

    const tasks = [{
      orderTask: orderTask,
      timeTask: timeTask,
      aborted: aborted
    }]

    const result = new Result(null, testId, tasks)

    const newResult = await this.resultRepository.persist(result)
    return newResult
  }
}
