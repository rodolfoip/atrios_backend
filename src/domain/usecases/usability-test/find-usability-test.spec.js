const UsabilityTest = require('../../models/usability-test')
const FindUseCase = require('./find-usability-test')

const makeSut = () => {
  const usabilityTestRepositorySpy = makeUsabilityTestRepository()
  const sut = new FindUseCase({
    usabilityTestRepository: usabilityTestRepositorySpy
  })
  return { sut, usabilityTestRepositorySpy }
}

const makeUsabilityTestRepository = () => {
  class UsabilityTestRepositorySpy {
    async find () {
      return this.list
    }
  }
  const usabilityTestRepositorySpy = new UsabilityTestRepositorySpy()
  usabilityTestRepositorySpy.list = [
    new UsabilityTest('60dbc3b024e294424492b6f9', 'any_name', 'any_accessCode', 'any_prototypeLink', 'any_externalLink')
  ]
  return usabilityTestRepositorySpy
}

describe('Describe Usa Case', () => {
  test('should return empty list if no result has founded', async () => {
    const { sut, usabilityTestRepositorySpy } = makeSut()
    usabilityTestRepositorySpy.list = []
    const list = await sut.find()
    expect(list).toEqual(usabilityTestRepositorySpy.list)
  })

  test('should return list if results has founded', async () => {
    const { sut, usabilityTestRepositorySpy } = makeSut()
    const list = await sut.find()
    expect(list).toEqual(usabilityTestRepositorySpy.list)
  })
})
