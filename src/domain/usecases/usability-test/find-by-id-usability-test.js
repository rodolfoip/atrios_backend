const { MissingParamError } = require('../../../utils/errors')

module.exports = class FindByIdUseCase {
  constructor ({ usabilityTestRepository }) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async find (userId, id) {
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (!id) {
      throw new MissingParamError('id')
    }

    return await this.usabilityTestRepository.findById(userId, id)
  }
}
