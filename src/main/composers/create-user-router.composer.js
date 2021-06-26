const { CreateUseCase } = require('../../domain/usecases/user')
const LoadUserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../infra/repositories/update-access-token-repository')
const UserRepository = require('../../infra/repositories/user-repository')
const CreateUserRoute = require('../../presentation/routers/create-user-router')
const EmailValidator = require('../../utils/helpers/email-validator')
const TokenGenerator = require('../../utils/helpers/token-generator')
const Encrypter = require('../../utils/helpers/encrypter')
const env = require('../config/env')

module.exports = class CreateUserRouterComposer {
  static compose () {
    const tokenGenerator = new TokenGenerator(env.tokenSecret)
    const loadUserByEmailRepository = new LoadUserByEmailRepository()
    const updateAccessTokenRepository = new UpdateAccessTokenRepository()
    const encrypter = new Encrypter()
    const userRepository = new UserRepository()
    const emailValidator = new EmailValidator()
    const createUseCase = new CreateUseCase({
      loadUserByEmailRepository,
      updateAccessTokenRepository,
      tokenGenerator,
      encrypter,
      userRepository
    })

    return new CreateUserRoute({
      createUseCase,
      emailValidator
    })
  }
}
