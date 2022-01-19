const { MissingParamError, ExistentParamError } = require('../../../utils/errors')
const UsabilityTest = require('../../models/usability-test')

module.exports = class CreteUseCase {
  constructor ({ usabilityTestRepository } = {}) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async create ({ name, accessCode, prototypeLink, externalLink, userId }) {
    if (!name) {
      throw new MissingParamError('name')
    }
    if (!accessCode) {
      throw new MissingParamError('accessCode')
    }
    if (!prototypeLink) {
      throw new MissingParamError('prototypeLink')
    }
    if (!externalLink) {
      throw new MissingParamError('externalLink')
    }
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (await this.usabilityTestRepository.findByAccessCode(accessCode)) {
      throw new ExistentParamError('accessCode')
    }
    const usabilityTest = new UsabilityTest(null, name, accessCode, prototypeLink, externalLink, userId)
    const newUsabilityTest = await this.usabilityTestRepository.persist(usabilityTest)
    return newUsabilityTest
  }
}
