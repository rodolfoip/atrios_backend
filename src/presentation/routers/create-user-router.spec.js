const { MissingParamError, InvalidParamError } = require('../../utils/errors')
const { ServerError } = require('../errors')
const CreateUserRoute = require('./create-user-router')

const makeSut = () => {
  const createUseCaseSpy = makeCreateUseCase()
  const emailValidatorSpy = makeEmailValidator()
  const sut = new CreateUserRoute({
    createUseCase: createUseCaseSpy,
    emailValidator: emailValidatorSpy
  })

  return {
    sut,
    createUseCaseSpy,
    emailValidatorSpy
  }
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

const makeCreateUseCaseWithError = () => {
  class CreateUseCaseSpy {
    async create () {
      throw new Error()
    }
  }
  return new CreateUseCaseSpy()
}

const makeEmailValidator = () => {
  class EmailValidatorSpy {
    isValid (email) {
      this.email = email
      return this.isEmailValid
    }
  }
  const emailValidatorSpy = new EmailValidatorSpy()
  emailValidatorSpy.isEmailValid = true
  return emailValidatorSpy
}

const makeEmailValidatorWithError = () => {
  class EmailValidatorSpy {
    isValid () {
      throw new Error()
    }
  }
  return new EmailValidatorSpy()
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

  test('should return 201 when valid credentials are provided', async () => {
    const { sut, createUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@test.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body.user).toEqual(createUseCaseSpy.user)
  })

  test('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@test.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new InvalidParamError('email').message)
  })

  test('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorSpy } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'valid@teste.com',
        password: 'any_password'
      }
    }
    await sut.route(httpRequest)
    expect(emailValidatorSpy.email).toBe(httpRequest.body.email)
  })

  test('should throw if invalid dependencies are provided', async () => {
    const invalid = {}
    const createUseCase = makeCreateUseCase()
    const suts = [].concat(
      new CreateUserRoute(),
      new CreateUserRoute({}),
      new CreateUserRoute({
        createUseCase: invalid
      }),
      new CreateUserRoute({
        createUseCase,
        emailValidator: invalid
      })
    )
    for (const sut of suts) {
      const httpRequest = {
        body: {
          name: 'any_name',
          email: 'any_email@teste.com',
          password: 'any_password'
        }
      }
      const httpResponse = await sut.route(httpRequest)
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toBe(new ServerError().message)
    }
  })

  test('should throw if dependency throws', async () => {
    const createUseCase = makeCreateUseCase()
    const suts = [].concat(
      new CreateUserRoute({
        createUseCase: makeCreateUseCaseWithError()
      }),
      new CreateUserRoute({
        createUseCase: createUseCase,
        emailValidator: makeEmailValidatorWithError()
      })
    )
    for (const sut of suts) {
      const httpRequest = {
        body: {
          name: 'any_name',
          email: 'any_email@teste.com',
          password: 'any_password'
        }
      }
      const httpResponse = await sut.route(httpRequest)
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toBe(new ServerError().message)
    }
  })
})
