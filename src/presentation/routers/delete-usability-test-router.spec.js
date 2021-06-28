const { MissingParamError } = require('../../utils/errors')
const { ServerError } = require('../errors')
const DeleteUsabilityTestRouter = require('./delete-usability-test-router')

const makeSut = () => {
  const deleteUseCaseSpy = makeDeleteUseCase()
  const sut = new DeleteUsabilityTestRouter({ deleteUseCase: deleteUseCaseSpy })
  return { sut, deleteUseCaseSpy }
}

const makeDeleteUseCase = () => {
  class DeleteUseCaseSpy {
    async delete (id) {
      this.id = id
      return this.isDeleted
    }
  }
  const deleteUseCaseSpy = new DeleteUseCaseSpy()
  deleteUseCaseSpy.isDeleted = true
  return deleteUseCaseSpy
}

const makeDeleteUseCaseWithError = () => {
  class DeleteUseCaseSpy {
    async delete () {
      throw new Error()
    }
  }
  return new DeleteUseCaseSpy()
}

describe('Delete UsabilityTest Router', () => {
  test('should return 400 if no id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('id').message)
  })

  test('should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should return 500 if no httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should call DeleteUseCase with correct params', async () => {
    const { sut, deleteUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        id: 'any_id'
      }
    }
    await sut.route(httpRequest)
    expect(deleteUseCaseSpy.isDeleted).toBe(true)
  })

  test('should return 204 when valid params are provided', async () => {
    const { sut, deleteUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(204)
    expect(httpResponse.body.isDeleted).toEqual(deleteUseCaseSpy.isDeleted)
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new DeleteUsabilityTestRouter()
    const httpRequest = {
      body: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should throw if dependecy throws', async () => {
    const deleteUseCase = makeDeleteUseCaseWithError()
    const sut = new DeleteUsabilityTestRouter({ deleteUseCase })
    const httpRequest = {
      body: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
})
