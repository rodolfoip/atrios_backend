const { MissingParamError } = require('../../../utils/errors')
const UsabilityTest = require('../../models/usability-test')

module.exports = class UpdateUseCase {
  constructor ({ usabilityTestRepository } = {}) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async update ({ _id, name, prototypeLink, externalLink, tasks, quantity }) {
    if (!_id) {
      throw new MissingParamError('id')
    }
    if (!name) {
      throw new MissingParamError('name')
    }
    if (!prototypeLink) {
      throw new MissingParamError('prototypeLink')
    }
    if (!externalLink) {
      throw new MissingParamError('externalLink')
    }

    const usabilityTest = new UsabilityTest(_id, name, null, prototypeLink, externalLink, tasks, quantity)
    const updatedUsabilityTest = await this.usabilityTestRepository.update(usabilityTest)
    return updatedUsabilityTest
  }
}
