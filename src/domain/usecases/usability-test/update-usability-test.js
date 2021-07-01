const { MissingParamError } = require('../../../utils/errors')
const UsabilityTest = require('../../models/usability-test')

module.exports = class UpdateUseCase {
  constructor ({ usabilityTestRepository } = {}) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async update ({ _id, name, accessCode, prototypeLink, externalLink }) {
    if (!_id) {
      throw new MissingParamError('id')
    }
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

    const usabilityTest = new UsabilityTest(_id, name, accessCode, prototypeLink, externalLink)
    const updatedUsabilityTest = await this.usabilityTestRepository.persist(usabilityTest)
    return updatedUsabilityTest
  }
}
