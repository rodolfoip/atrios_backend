const UsabilityTest = require('../../../domain/models/usability-test')
const { MissingParamError } = require('../../../utils/errors')
const { ServerError } = require('../../errors')
const FindByAccessCodeUsabilityTestRouter = require('./find-by-accesscode-usability-test-router')

const makeSut = () => {
  const findByAccessCodeUseCaseSpy = makeFindByNameUseCase()
  const sut = new FindByAccessCodeUsabilityTestRouter({ findByAccessCodeUseCase: findByAccessCodeUseCaseSpy })
  return { sut, findByAccessCodeUseCaseSpy }
}

const makeFindByNameUseCase = () => {
  class FindByAccessCodeUseCaseSpy {
    async find (name) {
      this.name = name
      return this.usabilityTest
    }
  }
  const findByAccessCodeUseCaseSpy = new FindByAccessCodeUseCaseSpy()
  findByAccessCodeUseCaseSpy.usabilityTest = new UsabilityTest('60dbc3b024e294424492b6f9', 'any_name', 'any_accessCode', 'any_prototypeLink', 'any_externalLink', 'any_userId')
  return findByAccessCodeUseCaseSpy
}

const makeFindByNameUseCaseWithError = () => {
  class FindByAccessCodeUseCaseSpy {
    async find () {
      throw new Error()
    }
  }
  return new FindByAccessCodeUseCaseSpy()
}

describe('Find UsabilityTest Router', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('accessCode').message)
  })

  test('should return 200 when find has called', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        accessCode: 'any_accessCode'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('should return usability test ', async () => {
    const { sut, findByAccessCodeUseCaseSpy } = makeSut()
    const httpRequest = {
      params: {
        accessCode: 'any_accessCode'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.body.usabilityTest).toEqual(findByAccessCodeUseCaseSpy.usabilityTest)
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new FindByAccessCodeUsabilityTestRouter()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should throw if dependecy throws', async () => {
    const findByNameUseCase = makeFindByNameUseCaseWithError()
    const sut = new FindByAccessCodeUsabilityTestRouter({ findByNameUseCase })
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
})
