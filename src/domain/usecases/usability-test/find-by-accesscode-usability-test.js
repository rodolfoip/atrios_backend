const { MissingParamError } = require('../../../utils/errors')

module.exports = class FindByAccessCodeUseCase {
  constructor ({ usabilityTestRepository }) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async find (accessCode) {
    if (!accessCode) {
      throw new MissingParamError('accessCode')
    }

    return await this.usabilityTestRepository.findByAccessCode(accessCode)
  }
}
