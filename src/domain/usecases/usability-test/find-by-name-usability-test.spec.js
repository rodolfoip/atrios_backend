const { MissingParamError } = require('../../../utils/errors')
const UsabilityTest = require('../../models/usability-test')
const FindByNameUseCase = require('./find-by-name-usability-test')

const makeSut = () => {
  const usabilityTestRepositorySpy = makeUsabilityTestRepository()
  const sut = new FindByNameUseCase({
    usabilityTestRepository: usabilityTestRepositorySpy
  })
  return { sut, usabilityTestRepositorySpy }
}

const makeUsabilityTestRepository = () => {
  class UsabilityTestRepositorySpy {
    async find (name) {
      this.name = name
      return this.usabilityTest
    }
  }
  const usabilityTestRepositorySpy = new UsabilityTestRepositorySpy()
  usabilityTestRepositorySpy.usabilityTest = new UsabilityTest('60dbc3b024e294424492b6f9', 'any_name', 'any_accessCode', 'any_prototypeLink', 'any_externalLink')
  return usabilityTestRepositorySpy
}

describe('Describe Usa Case', () => {
  test('should return MissingParamError if no name is provided', () => {
    const { sut } = makeSut()
    const promise = sut.find()
    expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('should return null if no result has founded', async () => {
    const { sut, usabilityTestRepositorySpy } = makeSut()
    usabilityTestRepositorySpy.usabilityTest = null
    const usabilityTest = await sut.find({ name: 'any_name' })
    expect(usabilityTest).toBeNull()
  })

  test('should return usabilityTest when valid params are provided', async () => {
    const { sut, usabilityTestRepositorySpy } = makeSut()
    const usabilityTest = await sut.find({ name: 'any_name' })
    expect(usabilityTest).toEqual(usabilityTestRepositorySpy.usabilityTest)
  })
})
