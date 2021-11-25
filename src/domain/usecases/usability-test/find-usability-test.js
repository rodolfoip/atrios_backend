module.exports = class FindUseCase {
  constructor ({ usabilityTestRepository }) {
    this.usabilityTestRepository = usabilityTestRepository
  }

  async find (userId) {
    return await this.usabilityTestRepository.find(userId)
  }
}
