const { MissingParamError } = require('../../../utils/errors')
const CreateUseCase = require('./create-usecase')

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

const makeSut = () => {
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
  const userRepositorySpy = makeUserRepository()
  const sut = new CreateUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    userRepository: userRepositorySpy
  })

  return {
    sut,
    loadUserByEmailRepositorySpy,
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
    const suts = [].concat(
      new CreateUseCase(),
      new CreateUseCase({}),
      new CreateUseCase({
        loadUserByEmailRepository: invalid
      }),
      new CreateUseCase({
        loadUserByEmailRepository,
        userRepository: invalid
      })
    )
    for (const sut of suts) {
      const fakeUser = {
        name: 'any_user',
        email: 'any_email@test.com',
        password: 'hashed_password'
      }
      const promise = sut.create(fakeUser)
      expect(promise).rejects.toThrow()
    }
  })

  test('should throw if invalid dependencies throws', async () => {
    const loadUserByEmailRepository = makeLoadUserByEmailRepository()
    const suts = [].concat(
      new CreateUseCase(),
      new CreateUseCase({}),
      new CreateUseCase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositoryWithError()
      }),
      new CreateUseCase({
        loadUserByEmailRepository,
        userRepository: makeUserRepositoryWithError()
      })
    )
    for (const sut of suts) {
      const fakeUser = {
        name: 'any_user',
        email: 'any_email@test.com',
        password: 'hashed_password'
      }
      const promise = sut.create(fakeUser)
      expect(promise).rejects.toThrow()
    }
  })
})
