const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')
const UnauthorizedError = require('../helpers/unauthorized-error')
const ServerError = require('../helpers/server-error')

const makeSut = () => {
  const authUseCaseSpy = makeAuthUseCase()
  authUseCaseSpy.accessToken = 'valid_token'
  const sut = new LoginRouter(authUseCaseSpy)

  return {
    sut,
    authUseCaseSpy
  }
}

const makeAuthUseCase = () => {
  class AuthUseCaseSpy {
    async auth (email, password) {
      this.email = email
      this.password = password
      return this.accessToken
    }
  }
  return new AuthUseCaseSpy()
}

const makeAuthUseCaseWithError = () => {
  class AuthUseCaseSpy {
    async auth () {
      throw new Error()
    }
  }
  return new AuthUseCaseSpy()
}

describe('Login router', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: '1234'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'teste@teste.com'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should call AuthUseCase with correct params', async () => {
    const { sut, authUseCaseSpy } = makeSut()

    const httpRequest = {
      body: {
        email: 'teste@teste.com',
        password: '1234'
      }
    }
    await sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('should return 401 when invalid credentials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    authUseCaseSpy.accessToken = null

    const httpRequest = {
      body: {
        email: 'invalid@teste.com',
        password: '1234'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })

  test('should return 200 when valid credentials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut()

    const httpRequest = {
      body: {
        email: 'valid@teste.com',
        password: 'valid_1234'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.accessToken).toEqual(authUseCaseSpy.accessToken)
  })

  test('should return 500 if no AuthUseCase is provided', async () => {
    const sut = new LoginRouter()

    const httpRequest = {
      body: {
        email: 'test@teste.com',
        password: '1234'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should return 500 if no AuthUseCase has no auth method', async () => {
    const sut = new LoginRouter({})
    const httpRequest = {
      body: {
        email: 'test@teste.com',
        password: '1234'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should return 500 if no AuthUseCase throws error', async () => {
    const authUseCaseSpy = makeAuthUseCaseWithError()
    authUseCaseSpy.accessToken = 'valid_token'
    const sut = new LoginRouter(authUseCaseSpy)
    const httpRequest = {
      body: {
        email: 'test@teste.com',
        password: '1234'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  // test('should return 400 if an invalid email is provided', async () => {
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       email: 'invalid@teste.com',
  //       password: 'any_password'
  //     }
  //   }
  //   const httpResponse = await sut.route(httpRequest)
  //   expect(httpResponse.statusCode).toBe(400)
  //   expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  // })
})
