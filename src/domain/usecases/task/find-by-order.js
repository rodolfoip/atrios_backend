const { MissingParamError } = require('../../../utils/errors')

module.exports = class FindByIdUseCase {
  constructor ({ usabilityTestRepository }) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async find (userId, id, order) {
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (!id) {
      throw new MissingParamError('id')
    }
    if (!order) {
      throw new MissingParamError('order')
    }

    const test = await this.usabilityTestRepository.findById(userId, id)

    return test.tasks.find((task) => task.order == order);
  }
}
