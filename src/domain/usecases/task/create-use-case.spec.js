const { MissingParamError } = require('../../../utils/errors')
const { CreateUseCase } = require('./index')

const makeSut = () => {
  const usabilityTestRepositorySpy = makeUsabilityTestRepository()
  const sut = new CreateUseCase({
    usabilityTestRepository: usabilityTestRepositorySpy
  })
  return {
    sut,
    usabilityTestRepositorySpy
  }
}

const makeUsabilityTestRepository = () => {
  class UsabilityTestRepositorySpy {
    async update ({ testId, order, description, tasks }) {
      this.testId = testId
      this.order = order
      this.description = description
      this.tasks = tasks
      return this.task
    }

    async findById (testId) {
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
    tasks: []
  }
  return usabilityTestRepositorySpy
}

const makeUsabilityTestRepositoryWithError = () => {
  class UsabilityTestRepositorySpy {
    async create () {
      throw new Error()
    }
  }

  return new UsabilityTestRepositorySpy()
}

describe('Create usability test', () => {
  test('should return null if no testId is provided', () => {
    const { sut } = makeSut()
    const promise = sut.create({})
    expect(promise).rejects.toThrow(new MissingParamError('testId'))
  })

  test('should return null if no order is provided', () => {
    const { sut } = makeSut()
    const promise = sut.create({
      testId: 'any_id'
    })
    expect(promise).rejects.toThrow(new MissingParamError('order'))
  })

  test('should return null if no description is provided', () => {
    const { sut } = makeSut()
    const promise = sut.create({
      testId: 'any_id',
      order: 1
    })
    expect(promise).rejects.toThrow(new MissingParamError('description'))
  })

  test('should return tasks when call create', async () => {
    const { sut, usabilityTestRepositorySpy } = makeSut()
    const fakeUsabilityTest = {
      order: 1,
      description: 'any_description'
    }
    await sut.create({
      testId: 'any_id',
      ...fakeUsabilityTest
    })
    expect(usabilityTestRepositorySpy.usabilityTest.tasks).toEqual([fakeUsabilityTest])
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new CreateUseCase()
    const fakeUsabilityTest = {
      testId: 'any_id',
      order: 1,
      description: 'any_description'
    }

    const promise = sut.create(fakeUsabilityTest)
    expect(promise).rejects.toThrow()
  })

  test('should throw if dependecy throws', async () => {
    const usabilityTestRepository = makeUsabilityTestRepositoryWithError()
    const sut = new CreateUseCase({ usabilityTestRepository })
    const fakeUsabilityTest = {
      testId: 'any_id',
      order: 1,
      description: 'any_description'
    }
    const promise = sut.create(fakeUsabilityTest)
    expect(promise).rejects.toThrow()
  })
})
