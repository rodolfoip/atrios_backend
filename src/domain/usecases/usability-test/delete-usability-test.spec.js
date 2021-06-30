const { MissingParamError } = require('../../../utils/errors')
const DeleteUseCase = require('./delete-usability-test')

const makeSut = () => {
  const usabilityTestRepositorySpy = makeUsabilityTestRepository()
  const sut = new DeleteUseCase({
    usabilityTestRepository: usabilityTestRepositorySpy
  })

  return { sut, usabilityTestRepositorySpy }
}

const makeUsabilityTestRepository = () => {
  class UsabilityTestRepositorySpy {
    async delete (id) {
      this.id = id
      return this.isDeleted
    }
  }
  const usabilityTestRepositorySpy = new UsabilityTestRepositorySpy()
  usabilityTestRepositorySpy.isDeleted = true
  return usabilityTestRepositorySpy
}

describe('Delete Usecase', () => {
  test('should return MissingParamError if no id is provided', () => {
    const { sut } = makeSut()
    const promise = sut.delete()
    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })

  test('should return true when call delete', async () => {
    const { sut, usabilityTestRepositorySpy } = makeSut()
    await sut.delete('any_id')
    expect(usabilityTestRepositorySpy.isDeleted).toBe(true)
  })
})
