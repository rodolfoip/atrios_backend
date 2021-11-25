const { MissingParamError } = require('../../../utils/errors')

module.exports = class DeleteUseCase {
  constructor ({ usabilityTestRepository }) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async delete (userId, id) {
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (!id) {
      throw new MissingParamError('id')
    }

    const isDeleted = await this.usabilityTestRepository.remove(userId, id)
    return isDeleted
  }
}
