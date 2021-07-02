const { MissingParamError } = require('../../../utils/errors')

module.exports = class FindByNameUseCase {
  constructor ({ usabilityTestRepository }) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async find (name) {
    if (!name) {
      throw new MissingParamError('name')
    }

    return await this.usabilityTestRepository.findByName(name)
  }
}
