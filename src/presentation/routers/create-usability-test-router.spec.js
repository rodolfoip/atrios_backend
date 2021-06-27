const { MissingParamError } = require('../../utils/errors')
const { ServerError } = require('../errors')
const CreateUsabilityTestRouter = require('./create-usability-test-router')

const makeSut = () => {
  const sut = new CreateUsabilityTestRouter()
  return { sut }
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
})
