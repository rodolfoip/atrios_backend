const { MissingParamError } = require('../../../utils/errors')
const UsabilityTest = require('../../models/usability-test')
const FindByAccessCodeUseCase = require('./find-by-accesscode-usability-test')

const makeSut = () => {
  const usabilityTestRepositorySpy = makeUsabilityTestRepository()
  const sut = new FindByAccessCodeUseCase({
    usabilityTestRepository: usabilityTestRepositorySpy
  })
  return { sut, usabilityTestRepositorySpy }
}

const makeUsabilityTestRepository = () => {
  class UsabilityTestRepositorySpy {
    async findByAccessCode (accessCode) {
      this.accessCode = accessCode
      return this.usabilityTest
    }
  }
  const usabilityTestRepositorySpy = new UsabilityTestRepositorySpy()
  usabilityTestRepositorySpy.usabilityTest = new UsabilityTest('60dbc3b024e294424492b6f9', 'any_name', 'any_code', 'any_prototypeLink', 'any_externalLink')
  return usabilityTestRepositorySpy
}

describe('Find by access code Usa Case', () => {
  test('should return MissingParamError if no access code is provided', () => {
    const { sut } = makeSut()
    const promise = sut.find()
    expect(promise).rejects.toThrow(new MissingParamError('accessCode'))
  })

  test('should return null if no result has founded', async () => {
    const { sut, usabilityTestRepositorySpy } = makeSut()
    usabilityTestRepositorySpy.usabilityTest = null
    const usabilityTest = await sut.find({ accessCode: 'any_code' })
    expect(usabilityTest).toBeNull()
  })

  test('should return usabilityTest when valid params are provided', async () => {
    const { sut, usabilityTestRepositorySpy } = makeSut()
    const usabilityTest = await sut.find({ name: 'any_code' })
    expect(usabilityTest).toEqual(usabilityTestRepositorySpy.usabilityTest)
  })
})
