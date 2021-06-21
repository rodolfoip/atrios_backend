const { MissingParamError } = require('../../utils/errors')

module.exports = class CreateUseCase {
  constructor (loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async create ({ name, email, password }) {
    if (!name) {
      throw new MissingParamError('name')
    }
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }

    const hasUser = await this.loadUserByEmailRepository.load(email)

    if (hasUser) {
      throw new Error('User already exists')
    }
  }
}
