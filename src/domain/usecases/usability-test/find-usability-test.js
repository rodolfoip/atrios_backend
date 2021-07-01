module.exports = class FindUseCase {
  constructor ({ usabilityTestRepository }) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async find () {
    return await this.usabilityTestRepository.find()
  }
}
