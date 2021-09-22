const { MissingParamError } = require('../../../utils/errors')

module.exports = class FindByIdUseCase {
  constructor ({ usabilityTestRepository }) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async find (id) {
    if (!id) {
      throw new MissingParamError('id')
    }

    return await this.usabilityTestRepository.findById(id)
  }
}
