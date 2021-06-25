const { MissingParamError } = require('../../../utils/errors')
const CreateUseCase = require('./create-usecase')
const bcrypt = require('bcrypt')

const makeLoadUserByEmailRepository = () => {
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }

  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  return loadUserByEmailRepositorySpy
}

const makeLoadUserByEmailRepositoryWithError = () => {
  class LoadUserByEmailRepositorySpy {
    async load () {
      throw new Error()
    }
  }
  return new LoadUserByEmailRepositorySpy()
}

const makeUpdateAccessTokenRepository = () => {
  class UpdateAccessTokenRepositorySpy {
    async update (userId, accessToken) {
      this.userId = userId
      this.accessToken = accessToken
    }
  }
  return new UpdateAccessTokenRepositorySpy()
}

const makeUpdateAccessTokenRepositoryWithError = () => {
  class UpdateAccessTokenRepositorySpy {
    async update () {
      throw new Error()
    }
  }
  return new UpdateAccessTokenRepositorySpy()
}

const makeUserRepository = () => {
  class UserRepositorySpy {
    async persist ({ name, email, password }) {
      this.name = name
      this.email = email
      this.password = password

      return this.user
    }
  }
  const userRepositorySpy = new UserRepositorySpy()
  userRepositorySpy.user = {
    name: 'any_user',
    email: 'any_email@test.com',
    password: 'hashed_password'
  }
  return userRepositorySpy
}

const makeUserRepositoryWithError = () => {
  class UserRepositorySpy {
    async persist () {
      throw new Error()
    }
  }
  const userRepositorySpy = new UserRepositorySpy()
  userRepositorySpy.user = {
    name: 'any_user',
    email: 'any_email@test.com',
    password: 'hashed_password'
  }
  return userRepositorySpy
}

const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    async generate (userId) {
      this.userId = userId
      return this.accessToken
    }
  }
  const tokenGeneratorSpy = new TokenGeneratorSpy()
  tokenGeneratorSpy.accessToken = 'any_token'
  return tokenGeneratorSpy
}

const makeTokenGeneratorWithError = () => {
  class TokenGeneratorSpy {
    async generate () {
      throw new Error()
    }
  }
  return new TokenGeneratorSpy()
}

const makeEncrypter = () => {
  class EncrypterSpy {
    async encryptedPassword (password, saltOrRounds) {
      this.password = password
      this.saltOrRounds = saltOrRounds
      return this.password
    }
  }
  return new EncrypterSpy()
}

const makeEncrypterWithError = () => {
  class EncrypterSpy {
    async encryptPassword () {
      throw new Error()
    }
  }
  return new EncrypterSpy()
}

const makeSut = () => {
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
  const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepository()
  const tokenGeneratorSpy = makeTokenGenerator()
  const userRepositorySpy = makeUserRepository()
  const encrypterSpy = makeEncrypter()
  const sut = new CreateUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    updateAccessTokenRepository: updateAccessTokenRepositorySpy,
    tokenGenerator: tokenGeneratorSpy,
    encrypter: encrypterSpy,
    userRepository: userRepositorySpy
  })

  return {
    sut,
    loadUserByEmailRepositorySpy,
    updateAccessTokenRepositorySpy,
    tokenGeneratorSpy,
    userRepositorySpy
  }
}

describe('Create Usecase', () => {
  test('should return null if no name is provided', () => {
    const { sut } = makeSut()
    const promise = sut.create({})
    expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('should return null if no email is provided', () => {
    const { sut } = makeSut()
    const promise = sut.create({
      name: 'any_user'
    })
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('should return null if no password is provided', () => {
    const { sut } = makeSut()
    const promise = sut.create({
      name: 'any_user',
      email: 'any_email@test.com'
    })
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('should return error user already exists when call create', () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = {
      email: 'any_email@test.com'
    }
    const fakeUser = {
      name: 'any_user',
      email: 'any_email@test.com',
      password: 'hashed_password'
    }
    const promise = sut.create(fakeUser)
    expect(promise).rejects.toThrow(new Error('User already exists'))
  })

  test('should return user when call create', async () => {
    const { sut, userRepositorySpy } = makeSut()
    const fakeUser = {
      name: 'any_user',
      email: 'any_email@test.com',
      password: 'hashed_password'
    }
    await sut.create(fakeUser)
    expect(userRepositorySpy.user).toEqual(fakeUser)
  })

  test('should throw if invalid dependencies are provided', async () => {
    const invalid = {}
    const loadUserByEmailRepository = makeLoadUserByEmailRepository()
    const tokenGenerator = makeTokenGenerator()
    const updateAccessTokenRepository = makeUpdateAccessTokenRepository()
    const encrypter = makeEncrypter()
    const suts = [].concat(
      new CreateUseCase(),
      new CreateUseCase({}),
      new CreateUseCase({
        loadUserByEmailRepository: invalid
      }),
      new CreateUseCase({
        loadUserByEmailRepository,
        tokenGenerator: invalid
      }),
      new CreateUseCase({
        loadUserByEmailRepository,
        tokenGenerator,
        updateAccessTokenRepository: invalid
      }),
      new CreateUseCase({
        loadUserByEmailRepository,
        tokenGenerator,
        updateAccessTokenRepository,
        encrypter: invalid
      }),
      new CreateUseCase({
        loadUserByEmailRepository,
        tokenGenerator,
        updateAccessTokenRepository,
        encrypter,
        userRepository: invalid
      })
    )
    for (const sut of suts) {
      const fakeUser = {
        name: 'any_user',
        email: 'any_email@test.com',
        password: bcrypt.hashSync('hashed_password', 10)
      }
      const promise = sut.create(fakeUser)
      expect(promise).rejects.toThrow()
    }
  })

  test('should throw if invalid dependencies throws', async () => {
    const loadUserByEmailRepository = makeLoadUserByEmailRepository()
    const updateAccessTokenRepository = makeUpdateAccessTokenRepository()
    const encrypter = makeEncrypter()
    const tokenGenerator = makeTokenGenerator()
    const suts = [].concat(
      new CreateUseCase(),
      new CreateUseCase({}),
      new CreateUseCase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositoryWithError()
      }),
      new CreateUseCase({
        loadUserByEmailRepository,
        tokenGenerator: makeTokenGeneratorWithError()
      }),
      new CreateUseCase({
        loadUserByEmailRepository,
        tokenGenerator,
        updateAccessTokenRepository: makeUpdateAccessTokenRepositoryWithError()
      }),
      new CreateUseCase({
        loadUserByEmailRepository,
        tokenGenerator,
        updateAccessTokenRepository,
        encrypter: makeEncrypterWithError()
      }),
      new CreateUseCase({
        loadUserByEmailRepository,
        tokenGenerator,
        updateAccessTokenRepository,
        encrypter,
        userRepository: makeUserRepositoryWithError()
      })
    )
    for (const sut of suts) {
      const fakeUser = {
        name: 'any_user',
        email: 'any_email@test.com',
        password: bcrypt.hashSync('hashed_password', 10)
      }
      const promise = sut.create(fakeUser)
      expect(promise).rejects.toThrow()
    }
  })
})
