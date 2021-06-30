const { MissingParamError } = require('../../../utils/errors')

module.exports = class DeleteUseCase {
  constructor ({ usabilityTestRepository }) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async delete (id) {
    if (!id) {
      throw new MissingParamError('id')
    }

    const isDeleted = await this.usabilityTestRepository.delete(id)
    return isDeleted
  }
}
