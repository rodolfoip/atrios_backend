const { MissingParamError } = require('../../../utils/errors')
const { ServerError } = require('../../errors')
const { DeleteTaskRouter } = require('../task')

const makeSut = () => {
  const deleteUseCaseSpy = makeCreateUseCase()
  const sut = new DeleteTaskRouter({ deleteUseCase: deleteUseCaseSpy })
  return { sut, deleteUseCaseSpy }
}

const makeCreateUseCase = () => {
  class DeleteUseCaseSpy {
    async delete ({ userId, testId, order }) {
      this.userId = userId
      this.testId = testId
      this.order = order
      return this.task
    }
  }

  const deleteUseCaseSpy = new DeleteUseCaseSpy()
  deleteUseCaseSpy.task = {
    userId: 'any_userId',
    testId: 'any_id',
    order: 'any_order'
  }
  return deleteUseCaseSpy
}

const makeCreateUseCaseWithError = () => {
  class DeleteUseCaseSpy {
    async delete () {
      throw new Error()
    }
  }

  return new DeleteUseCaseSpy()
}

describe('Delete task router', () => {
  test('should return 400 if no userId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('userId').message)
  })

  test('should return 400 if no idTest is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        userId: 'any_userId'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('testId').message)
  })

  test('should return 400 if no order is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        userId: 'any_userId',
        testId: 'any_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('order').message)
  })

  test('should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should call deleteUseCase with correct params', async () => {
    const { sut, deleteUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        userId: 'any_userId',
        testId: 'any_id',
        order: 'any_order'
      }
    }
    await sut.route(httpRequest)
    expect(deleteUseCaseSpy.task.testId).toBe(httpRequest.body.testId)
    expect(deleteUseCaseSpy.task.order).toBe(httpRequest.body.order)
    expect(deleteUseCaseSpy.task.description).toBe(httpRequest.body.description)
  })

  test('should return 204 when valid params are provided', async () => {
    const { sut, deleteUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        userId: 'any_userId',
        testId: 'any_id',
        order: 'any_order'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(204)
    expect(httpResponse.body.task).toEqual(deleteUseCaseSpy.task)
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new DeleteTaskRouter()
    const httpRequest = {
      body: {
        userId: 'any_userId',
        testId: 'any_id',
        order: 'any_order'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should throw if dependecy throws', async () => {
    const createUseCase = makeCreateUseCaseWithError()
    const sut = new DeleteTaskRouter({ createUseCase })
    const httpRequest = {
      body: {
        userId: 'any_userId',
        testId: 'any_id',
        order: 'any_order'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
})
