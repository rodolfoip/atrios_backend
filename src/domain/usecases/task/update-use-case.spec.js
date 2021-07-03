const { MissingParamError } = require('../../../utils/errors')
const { UpdateUseCase } = require('./index')

const makeSut = () => {
  const usabilityTestRepositorySpy = makeUsabilityTestRepository()
  const sut = new UpdateUseCase({
    usabilityTestRepository: usabilityTestRepositorySpy
  })
  return {
    sut,
    usabilityTestRepositorySpy
  }
}

const makeUsabilityTestRepository = () => {
  class UsabilityTestRepositorySpy {
    async update ({ testId, order, description, sus, affectGrid, tasks }) {
      this.testId = testId
      this.order = order
      this.description = description
      this.sus = sus
      this.affectGrid = affectGrid
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
    tasks: [
      {
        testId: 'any_id',
        order: 1,
        description: 'any_description'
      }
    ]
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

describe('Update task', () => {
  test('should return null if no testId is provided', () => {
    const { sut } = makeSut()
    const promise = sut.update({})
    expect(promise).rejects.toThrow(new MissingParamError('testId'))
  })

  test('should return null if no order is provided', () => {
    const { sut } = makeSut()
    const promise = sut.update({
      testId: 'any_id'
    })
    expect(promise).rejects.toThrow(new MissingParamError('order'))
  })

  test('should return tasks when call update', async () => {
    const { sut, usabilityTestRepositorySpy } = makeSut()
    const fakeTask = {
      order: 1,
      description: 'other_description',
      sus: 10,
      affectGrid: 45
    }
    await sut.update({
      testId: 'any_id',
      ...fakeTask
    })
    expect(usabilityTestRepositorySpy.usabilityTest.tasks).toMatchObject([fakeTask])
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new UpdateUseCase()
    const fakeUsabilityTest = {
      testId: 'any_id',
      order: 1,
      description: 'any_description'
    }

    const promise = sut.update(fakeUsabilityTest)
    expect(promise).rejects.toThrow()
  })

  test('should throw if dependecy throws', async () => {
    const usabilityTestRepository = makeUsabilityTestRepositoryWithError()
    const sut = new UpdateUseCase({ usabilityTestRepository })
    const fakeUsabilityTest = {
      testId: 'any_id',
      order: 1,
      description: 'any_description'
    }
    const promise = sut.update(fakeUsabilityTest)
    expect(promise).rejects.toThrow()
  })
})
