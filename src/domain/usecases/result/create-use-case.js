const { MissingParamError } = require('../../../utils/errors')
const Result = require('../../models/result')

module.exports = class CreteUseCase {
  constructor ({ resultRepository } = {}) {
    this.resultRepository = resultRepository
  }

  async create ({ testId, orderTask, sus, affectGrid, timeTask, aborted, clicks }) {
    if (!testId) {
      throw new MissingParamError('testId')
    }
    if (!orderTask) {
      throw new MissingParamError('orderTask')
    }
    if (!sus) {
      throw new MissingParamError('sus')
    }
    if (!affectGrid) {
      throw new MissingParamError('affectGrid')
    }
    if (!timeTask) {
      throw new MissingParamError('timeTask')
    }
    if (typeof aborted !== 'boolean') {
      throw new MissingParamError('aborted')
    }
    if (!clicks) {
      throw new MissingParamError('clicks')
    }

    const result = new Result(testId, orderTask, sus, affectGrid, timeTask, aborted, clicks)

    await this.resultRepository.persist(result)
    return result
  }
}
