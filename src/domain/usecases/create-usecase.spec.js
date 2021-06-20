const { MissingParamError } = require('../../utils/errors')
const CreateUseCase = require('./create-usecase')

const makeSut = () => {
  return new CreateUseCase()
}

describe('Create Usecase', () => {
  test('should return null if no name is provided', () => {
    const sut = makeSut()
    const promise = sut.create({})
    expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('should return null if no email is provided', () => {
    const sut = makeSut()
    const promise = sut.create({
      name: 'any_user'
    })
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('should return null if no password is provided', () => {
    const sut = makeSut()
    const promise = sut.create({
      name: 'any_user',
      email: 'any_email@test.com'
    })
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})
