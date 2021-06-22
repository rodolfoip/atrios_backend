const { MissingParamError } = require('../../utils/errors')
const { ServerError } = require('../errors')
const CreateUserRoute = require('./create-user-router')

const makeSut = () => {
  const createUseCaseSpy = makeCreateUseCase()
  const sut = new CreateUserRoute({
    createUseCase: createUseCaseSpy
  })

  return { sut, createUseCaseSpy }
}

const makeCreateUseCase = () => {
  class CreateUseCaseSpy {
    async create ({ name, email, password }) {
      this.name = name
      this.email = email
      this.password = password
      return this.user
    }
  }

  const createUseCaseSpy = new CreateUseCaseSpy()
  createUseCaseSpy.user = {
    name: 'any_name',
    email: 'any_email@test.com',
    password: 'any_password'
  }

  return createUseCaseSpy
}

describe('CreateUser router', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@test.com',
        password: '1234'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('name').message)
  })

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: '1234'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('email').message)
  })

  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@test.com'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('password').message)
  })

  test('should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should call CreateUseCase with correct params', async () => {
    const { sut, createUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@test.com',
        password: 'any_password'
      }
    }
    await sut.route(httpRequest)
    expect(createUseCaseSpy.user.name).toBe(httpRequest.body.name)
    expect(createUseCaseSpy.user.email).toBe(httpRequest.body.email)
    expect(createUseCaseSpy.user.password).toBe(httpRequest.body.password)
  })
})
