const { MissingParamError } = require('../../utils/errors')
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

const makeSut = () => {
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
  const sut = new CreateUseCase(loadUserByEmailRepositorySpy)

  return {
    sut,
    loadUserByEmailRepositorySpy
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
})
