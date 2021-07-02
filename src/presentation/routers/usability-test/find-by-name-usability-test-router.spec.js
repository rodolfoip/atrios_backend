const UsabilityTest = require('../../../domain/models/usability-test')
const { MissingParamError } = require('../../../utils/errors')
const { ServerError } = require('../../errors')
const FindByNameUsabilityTestRouter = require('./find-by-name-usability-test-router')

const makeSut = () => {
  const findByNameUseCaseSpy = makeFindByNameUseCase()
  const sut = new FindByNameUsabilityTestRouter({ findByNameUseCase: findByNameUseCaseSpy })
  return { sut, findByNameUseCaseSpy }
}

const makeFindByNameUseCase = () => {
  class FindByNameUseCaseSpy {
    async find (name) {
      this.name = name
      return this.usabilityTest
    }
  }
  const findByNameUseCaseSpy = new FindByNameUseCaseSpy()
  findByNameUseCaseSpy.usabilityTest = new UsabilityTest('60dbc3b024e294424492b6f9', 'any_name', 'any_accessCode', 'any_prototypeLink', 'any_externalLink')
  return findByNameUseCaseSpy
}

const makeFindByNameUseCaseWithError = () => {
  class FindByNameUseCaseSpy {
    async find () {
      throw new Error()
    }
  }
  return new FindByNameUseCaseSpy()
}

describe('Find UsabilityTest Router', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('name').message)
  })

  test('should return 200 when find has called', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('should return usability test ', async () => {
    const { sut, findByNameUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.body.usabilityTest).toEqual(findByNameUseCaseSpy.usabilityTest)
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new FindByNameUsabilityTestRouter()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should throw if dependecy throws', async () => {
    const findByNameUseCase = makeFindByNameUseCaseWithError()
    const sut = new FindByNameUsabilityTestRouter({ findByNameUseCase })
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
})
