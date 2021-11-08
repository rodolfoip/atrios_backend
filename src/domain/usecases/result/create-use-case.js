const { MissingParamError } = require('../../../utils/errors')
const Result = require('../../models/result')

module.exports = class CreteUseCase {
  constructor ({ resultRepository } = {}) {
    this.resultRepository = resultRepository
  }

  async create ({ testId, orderTask, timeTask, aborted, clicks, sus, affectGrid }) {
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
    if (typeof clicks !== 'number') {
      throw new MissingParamError('clicks')
    }

    const result = new Result(null, testId, orderTask, timeTask, aborted, clicks)

    const newResult = await this.resultRepository.persist(result)
    return newResult
  }
}
