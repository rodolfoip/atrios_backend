const { MissingParamError } = require('../../../utils/errors')

module.exports = class FindByTestIdUseCase {
  constructor ({ resultRepository }) {
    this.resultRepository = resultRepository
  }

  async findByTestId (testId) {
    if (!testId) {
      throw new MissingParamError('testId')
    }

    return await this.resultRepository.findByTestId(testId)
  }
}
