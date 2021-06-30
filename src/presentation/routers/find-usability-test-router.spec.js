const UsabilityTest = require('../../domain/models/usability-test')
const { ServerError } = require('../errors')
const FindUsabilityTestRouter = require('./find-usability-test-router')

const makeSut = () => {
  const findUseCaseSpy = makeFindUseCase()
  const sut = new FindUsabilityTestRouter({ findUseCase: findUseCaseSpy })
  return { sut, findUseCaseSpy }
}

const makeFindUseCase = () => {
  class FindUseCaseSpy {
    async find () {
      return this.list
    }
  }
  const findUseCaseSpy = new FindUseCaseSpy()
  findUseCaseSpy.list = [
    new UsabilityTest('60dbc3b024e294424492b6f9', 'any_name', 'any_accessCode', 'any_prototypeLink', 'any_externalLink')
  ]
  return findUseCaseSpy
}

const makeFindUseCaseWithError = () => {
  class FindUseCaseSpy {
    async find () {
      throw new Error()
    }
  }
  return new FindUseCaseSpy()
}

describe('Find UsabilityTest Router', () => {
  test('should return 200 when find has called', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(200)
  })

  test('should return usability test list', async () => {
    const { sut, findUseCaseSpy } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.body.list).toEqual(findUseCaseSpy.list)
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new FindUsabilityTestRouter()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should throw if dependecy throws', async () => {
    const findUseCase = makeFindUseCaseWithError()
    const sut = new FindUsabilityTestRouter({ findUseCase })
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
})
