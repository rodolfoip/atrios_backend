const { MissingParamError } = require('../../../utils/errors')

module.exports = class UpdateUseCase {
  constructor ({ resultRepository } = {}) {
    this.resultRepository = resultRepository
  }

  async update ({ _id, sus, affectGrid }) {
    if (!_id) {
      throw new MissingParamError('_id')
    }

    const newResult = await this.resultRepository.update({ _id, sus, affectGrid })
    return newResult
  }
}
