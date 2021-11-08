const { MissingParamError } = require('../../../utils/errors')

module.exports = class FindByIdUseCase {
  constructor ({ resultRepository }) {
    this.resultRepository = resultRepository
  }

  async findById (id) {
    if (!id) {
      throw new MissingParamError('id')
    }

    return await this.resultRepository.findById(id)
  }
}
