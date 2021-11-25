const UsabilityTest = require('../../../domain/models/usability-test')
const { MissingParamError } = require('../../../utils/errors')
const { ServerError } = require('../../errors')
const FindByIdUsabilityTestRouter = require('./find-by-id-usability-test-router')

const makeSut = () => {
  const findByIdUseCaseSpy = makeFindByIdUseCase()
  const sut = new FindByIdUsabilityTestRouter({ findByIdUseCase: findByIdUseCaseSpy })
  return { sut, findByIdUseCaseSpy }
}

const makeFindByIdUseCase = () => {
  class FindByIdUseCaseSpy {
    async find (userId, id) {
      this.userId = userId
      this.id = id
      return this.usabilityTest
    }
  }
  const findByIdUseCaseSpy = new FindByIdUseCaseSpy()
  findByIdUseCaseSpy.usabilityTest = new UsabilityTest('60dbc3b024e294424492b6f9', 'any_name', 'any_accessCode', 'any_prototypeLink', 'any_externalLink', 'any_userId')
  return findByIdUseCaseSpy
}

const makeFindByIdUseCaseWithError = () => {
  class FindByIdUseCaseSpy {
    async find () {
      throw new Error()
    }
  }
  return new FindByIdUseCaseSpy()
}

describe('Find UsabilityTest Router', () => {
  test('should return 400 if no id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        userId: 'any_userId'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    return expect(httpResponse.body.error).toBe(new MissingParamError('id').message)
  })

  test('should return 200 when find has called', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        id: '60dbc3b024e294424492b6f9',
        userId: 'any_userId'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('should return usability test ', async () => {
    const { sut, findByIdUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        id: '60dbc3b024e294424492b6f9',
        userId: 'any_userId'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.body.usabilityTest).toEqual(findByIdUseCaseSpy.usabilityTest)
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new FindByIdUsabilityTestRouter()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should throw if dependecy throws', async () => {
    const findByIdUseCase = makeFindByIdUseCaseWithError()
    const sut = new FindByIdUsabilityTestRouter({ findByIdUseCase })
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
})
