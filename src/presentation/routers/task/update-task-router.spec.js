const { MissingParamError } = require('../../../utils/errors')
const { ServerError } = require('../../errors')
const { UpdateTaskRouter } = require('../task')

const makeSut = () => {
  const updateUseCaseSpy = makeUpdateUseCase()
  const sut = new UpdateTaskRouter({ updateUseCase: updateUseCaseSpy })
  return { sut, updateUseCaseSpy }
}

const makeUpdateUseCase = () => {
  class UpdateseCaseSpy {
    async update ({ userId, testId, actualOrder, newOrder, description, sus, affectGrid }) {
      this.userId = userId
      this.testId = testId
      this.actualOrder = actualOrder
      this.newOrder = newOrder
      this.description = description
      this.sus = sus
      this.affectGrid = affectGrid
      return this.task
    }
  }

  const updateUseCaseSpy = new UpdateseCaseSpy()
  updateUseCaseSpy.task = {
    userId: 'any_userId',
    testId: 'any_id',
    order: 'any_order',
    description: 'any_description',
    sus: 10,
    affectGrid: 45
  }
  return updateUseCaseSpy
}

const makeUpdateUseCaseWithError = () => {
  class UpdateUseCaseSpy {
    async update () {
      throw new Error()
    }
  }

  return new UpdateUseCaseSpy()
}

describe('Create task router', () => {
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
    expect(httpResponse.body.error).toBe(new MissingParamError('actualOrder').message)
  })

  test('should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should call updateUseCase with correct params', async () => {
    const { sut, updateUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        userId: 'any_userId',
        testId: 'any_id',
        actualOrder: 'any_order',
        description: 'any_description'
      }
    }
    await sut.route(httpRequest)
    expect(updateUseCaseSpy.task.testId).toBe(httpRequest.body.testId)
    expect(updateUseCaseSpy.task.order).toBe(httpRequest.body.actualOrder)
    expect(updateUseCaseSpy.task.description).toBe(httpRequest.body.description)
  })

  test('should return 200 when valid params are provided', async () => {
    const { sut, updateUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        userId: 'any_userId',
        testId: 'any_id',
        actualOrder: 'any_order',
        description: 'any_description'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.task).toEqual(updateUseCaseSpy.task)
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new UpdateTaskRouter()
    const httpRequest = {
      body: {
        userId: 'any_userId',
        testId: 'any_id',
        actualOrder: 'any_order',
        description: 'any_description'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should throw if dependecy throws', async () => {
    const updateUseCase = makeUpdateUseCaseWithError()
    const sut = new UpdateTaskRouter({ updateUseCase })
    const httpRequest = {
      body: {
        userId: 'any_userId',
        testId: 'any_id',
        actualOrder: 'any_order',
        description: 'any_description'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
})
