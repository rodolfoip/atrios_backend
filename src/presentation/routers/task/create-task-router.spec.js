const { MissingParamError } = require('../../../utils/errors')
const { ServerError } = require('../../errors')
const { CreateTaskRouter } = require('../task')

const makeSut = () => {
  const createUseCaseSpy = makeCreateUseCase()
  const findByOrderUseCaseSpy = makeFindByOrderUseCase()
  const sut = new CreateTaskRouter({ createUseCase: createUseCaseSpy, findByOrderUseCase: findByOrderUseCaseSpy })
  return { sut, createUseCaseSpy, findByOrderUseCaseSpy }
}

const makeCreateUseCase = () => {
  class CreateUseCaseSpy {
    async create ({ userId, testId, order, description }) {
      this.userId = userId
      this.testId = testId
      this.order = order
      this.description = description
      return this.task
    }
  }

  const createUseCaseSpy = new CreateUseCaseSpy()
  createUseCaseSpy.task = {
    userId: 'any_userId',
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

const makeFindByOrderUseCase = () => {
  class FindByOrderUseCaseSpy {
    async find() {
      return false;
    }
  }
  return new FindByOrderUseCaseSpy();
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
    expect(httpResponse.body.error).toBe(new MissingParamError('order').message)
  })

  test('should return 400 if no description is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        userId: 'any_userId',
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
        userId: 'any_userId',
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
        userId: 'any_userId',
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
        userId: 'any_userId',
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
        userId: 'any_userId',
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
