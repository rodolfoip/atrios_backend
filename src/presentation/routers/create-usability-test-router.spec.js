const { MissingParamError } = require('../../utils/errors')
const { ServerError } = require('../errors')
const CreateUsabilityTestRouter = require('./create-usability-test-router')

const makeSut = () => {
  const createUseCaseSpy = makeCreateUseCase()
  const sut = new CreateUsabilityTestRouter({ createUseCase: createUseCaseSpy })
  return { sut, createUseCaseSpy }
}

const makeCreateUseCase = () => {
  class CreateUseCaseSpy {
    async create ({ name, accessCode, prototypeLink, externalLink }) {
      this.name = name
      this.accessCode = accessCode
      this.prototypeLink = prototypeLink
      this.externalLink = externalLink
      return this.usabilityTest
    }
  }

  const createUseCaseSpy = new CreateUseCaseSpy()
  createUseCaseSpy.usabilityTest = {
    name: 'any_test',
    accessCode: 'any_accessCode',
    prototypeLink: 'any_prototypeLink',
    externalLink: 'any_externalLink'
  }
  return createUseCaseSpy
}

describe('Create Usability test router', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('name').message)
  })

  test('should return 400 if no accessCode is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_test'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('accessCode').message)
  })

  test('should return 400 if no prototypeLink is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_test',
        accessCode: 'any_accessCode'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('prototypeLink').message)
  })

  test('should return 400 if no externalLink is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_test',
        accessCode: 'any_accessCode',
        prototypeLink: 'any_prototypeLink'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('externalLink').message)
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

  test('should call createUseCase with correct params', async () => {
    const { sut, createUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_test',
        accessCode: 'any_accessCode',
        prototypeLink: 'any_prototypeLink',
        externalLink: 'any_externalLink'
      }
    }
    await sut.route(httpRequest)
    expect(createUseCaseSpy.usabilityTest.name).toBe(httpRequest.body.name)
    expect(createUseCaseSpy.usabilityTest.accessCode).toBe(httpRequest.body.accessCode)
    expect(createUseCaseSpy.usabilityTest.prototypeLink).toBe(httpRequest.body.prototypeLink)
    expect(createUseCaseSpy.usabilityTest.externalLink).toBe(httpRequest.body.externalLink)
  })

  test('should return 201 when valid params are provided', async () => {
    const { sut, createUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_test',
        accessCode: 'any_accessCode',
        prototypeLink: 'any_prototypeLink',
        externalLink: 'any_externalLink'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body.usabilityTest).toEqual(createUseCaseSpy.usabilityTest)
  })
})
