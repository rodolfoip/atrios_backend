const { MissingParamError } = require('../../../utils/errors')
const UsabilityTest = require('../../models/usability-test')

module.exports = class CreteUseCase {
  constructor ({ usabilityTestRepository } = {}) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async create ({ name, accessCode, prototypeLink, externalLink }) {
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
    const usabilityTest = new UsabilityTest(null, name, accessCode, prototypeLink, externalLink)
    const newUsabilityTest = await this.usabilityTestRepository.persist(usabilityTest)
    return newUsabilityTest
  }
}
