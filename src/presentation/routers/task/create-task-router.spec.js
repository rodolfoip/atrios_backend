const { MissingParamError } = require('../../../utils/errors')
const { ServerError } = require('../../errors')
const { CreateTaskRouter } = require('../task')

const makeSut = () => {
  const createUseCaseSpy = makeCreateUseCase()
  const sut = new CreateTaskRouter({ createUseCase: createUseCaseSpy })
  return { sut, createUseCaseSpy }
}

const makeCreateUseCase = () => {
  class CreateUseCaseSpy {
    async create ({ testId, order, description }) {
      this.testId = testId
      this.order = order
      this.description = description
      return this.task
    }
  }

  const createUseCaseSpy = new CreateUseCaseSpy()
  createUseCaseSpy.task = {
    testId: 'any_id',
    order: 'any_order',
    description: 'any_description'
  }
  return createUseCaseSpy
}

const makeCreateUseCaseWithError = () => {
  class CreateUseCaseSpy {
    async create ({ name, accessCode, prototypeLink, externalLink }) {
      throw new Error()
    }
  }

  return new CreateUseCaseSpy()
}

describe('Create task router', () => {
  test('should return 400 if no idTest is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('testId').message)
  })

  test('should return 400 if no order is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        testId: 'any_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('order').message)
  })

  test('should return 400 if no description is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        testId: 'any_id',
        order: 1
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('description').message)
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
        testId: 'any_id',
        order: 'any_order',
        description: 'any_description'
      }
    }
    await sut.route(httpRequest)
    expect(createUseCaseSpy.task.testId).toBe(httpRequest.body.testId)
    expect(createUseCaseSpy.task.order).toBe(httpRequest.body.order)
    expect(createUseCaseSpy.task.description).toBe(httpRequest.body.description)
  })

  test('should return 201 when valid params are provided', async () => {
    const { sut, createUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        testId: 'any_id',
        order: 'any_order',
        description: 'any_description'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body.task).toEqual(createUseCaseSpy.task)
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new CreateTaskRouter()
    const httpRequest = {
      body: {
        testId: 'any_id',
        order: 'any_order',
        description: 'any_description'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should throw if dependecy throws', async () => {
    const createUseCase = makeCreateUseCaseWithError()
    const sut = new CreateTaskRouter({ createUseCase })
    const httpRequest = {
      body: {
        testId: 'any_id',
        order: 'any_order',
        description: 'any_description'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
})