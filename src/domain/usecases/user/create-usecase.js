const { MissingParamError } = require('../../../utils/errors')

module.exports = class CreateUseCase {
  constructor ({ loadUserByEmailRepository, tokenGenerator, updateAccessTokenRepository, encrypter, userRepository } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.tokenGenerator = tokenGenerator
    this.userRepository = userRepository
    this.updateAccessTokenRepository = updateAccessTokenRepository
    this.encrypter = encrypter
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

    const encryptedPassword = this.encrypter.encryptedPassword(password, 10)

    const newUser = await this.userRepository.persist({ name, email, encryptedPassword })
    const accessToken = await this.tokenGenerator.generate(newUser._id)
    await this.updateAccessTokenRepository.update(newUser._id, accessToken)
    return newUser
  }
}
