const { MissingParamError } = require('../../../utils/errors')

module.exports = class FindByNameUseCase {
  constructor ({ usabilityTestRepository }) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async find (userId, name) {
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (!name) {
      throw new MissingParamError('name')
    }

    return await this.usabilityTestRepository.findByName(userId, name)
  }
}
