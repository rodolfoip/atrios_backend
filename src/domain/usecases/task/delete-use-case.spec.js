const { MissingParamError } = require('../../../utils/errors')
const { DeleteUseCase } = require('./index')

const makeSut = () => {
  const usabilityTestRepositorySpy = makeUsabilityTestRepository()
  const sut = new DeleteUseCase({
    usabilityTestRepository: usabilityTestRepositorySpy
  })
  return {
    sut,
    usabilityTestRepositorySpy
  }
}

const makeUsabilityTestRepository = () => {
  class UsabilityTestRepositorySpy {
    async update ({ userId, testId, order, description, tasks }) {
      this.userId = userId
      this.testId = testId
      this.order = order
      this.description = description
      this.tasks = tasks
      return this.task
    }

    async findById (userId, testId) {
      this.userId = userId
      this.testId = testId
      return this.usabilityTest
    }
  }
  const usabilityTestRepositorySpy = new UsabilityTestRepositorySpy()
  usabilityTestRepositorySpy.usabilityTest = {
    name: 'any_test',
    accessCode: 'any_accessCode',
    prototypeLink: 'any_prototypeLink',
    externalLink: 'any_externalLink',
    userId: 'any_userId',
    tasks: [
      {
        testId: 'any_id',
        order: 1,
        description: 'any_description'
      },
      {
        testId: 'any_id',
        order: 2,
        description: 'any_description_task_2'
      }
    ]
  }
  return usabilityTestRepositorySpy
}

const makeUsabilityTestRepositoryWithError = () => {
  class UsabilityTestRepositorySpy {
    async delete () {
      throw new Error()
    }
  }

  return new UsabilityTestRepositorySpy()
}

describe('Delete usability test', () => {
  test('should return MissingParamError if no userId is provided', () => {
    const { sut } = makeSut()
    const promise = sut.delete({})
    expect(promise).rejects.toThrow(new MissingParamError('userId'))
  })

  test('should return MissingParamError if no testId is provided', () => {
    const { sut } = makeSut()
    const promise = sut.delete({
      userId: 'any_userId'
    })
    expect(promise).rejects.toThrow(new MissingParamError('testId'))
  })

  test('should return MissingParamError if no order is provided', () => {
    const { sut } = makeSut()
    const promise = sut.delete({
      userId: 'any_userId',
      testId: 'any_id'
    })
    expect(promise).rejects.toThrow(new MissingParamError('order'))
  })

  test('should return tasks when call delete', async () => {
    const { sut, usabilityTestRepositorySpy } = makeSut()
    const fakeTask = {
      userId: 'any_userId',
      testId: 'any_id',
      order: 1
    }
    await sut.delete(fakeTask)
    expect(usabilityTestRepositorySpy.usabilityTest.tasks).not.toContain([fakeTask])
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new DeleteUseCase()
    const fakeUsabilityTest = {
      userId: 'any_userId',
      testId: 'any_id',
      order: 1
    }

    const promise = sut.delete(fakeUsabilityTest)
    expect(promise).rejects.toThrow()
  })

  test('should throw if dependecy throws', async () => {
    const usabilityTestRepository = makeUsabilityTestRepositoryWithError()
    const sut = new DeleteUseCase({ usabilityTestRepository })
    const fakeUsabilityTest = {
      userId: 'any_userId',
      testId: 'any_id',
      order: 1
    }
    const promise = sut.delete(fakeUsabilityTest)
    expect(promise).rejects.toThrow()
  })
})
