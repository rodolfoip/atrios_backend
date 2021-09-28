const { MissingParamError } = require('../../../utils/errors')
const UpdateUseCase = require('./update-usability-test')

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
    async update ({ _id, name, accessCode, prototypeLink, externalLink }) {
      this._id = _id
      this.name = name
      this.accessCode = accessCode
      this.prototypeLink = prototypeLink
      this.externalLink = externalLink
      return this.user
    }
  }
  const usabilityTestRepositorySpy = new UsabilityTestRepositorySpy()
  usabilityTestRepositorySpy.usabilityTest = {
    _id: 'any_id',
    name: 'any_test',
    accessCode: 'any_accessCode',
    prototypeLink: 'any_prototypeLink',
    externalLink: 'any_externalLink'
  }
  return usabilityTestRepositorySpy
}

const makeUsabilityTestRepositoryWithError = () => {
  class UsabilityTestRepositorySpy {
    async update () {
      throw new Error()
    }
  }

  return new UsabilityTestRepositorySpy()
}

describe('Update usability test', () => {
  test('should throw MissingParamError if no id is provided', () => {
    const { sut } = makeSut()
    const promise = sut.update({})
    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })

  test('should throw MissingParamError if no name is provided', () => {
    const { sut } = makeSut()
    const promise = sut.update({
      _id: 'any_id'
    })
    expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('should throw MissingParamError if no prototypeLink is provided', () => {
    const { sut } = makeSut()
    const promise = sut.update({
      _id: 'any_id',
      name: 'any_testname',
      accessCode: 'any_access_code'

    })
    expect(promise).rejects.toThrow(new MissingParamError('prototypeLink'))
  })

  test('should throw MissingParamError if no externalLink is provided', () => {
    const { sut } = makeSut()
    const promise = sut.update({
      _id: 'any_id',
      name: 'any_testname',
      accessCode: 'any_access_code',
      prototypeLink: 'any_prototype_link'
    })
    expect(promise).rejects.toThrow(new MissingParamError('externalLink'))
  })

  test('should return usabilityTest when call create', async () => {
    const { sut, usabilityTestRepositorySpy } = makeSut()
    const fakeUsabilityTest = {
      _id: 'any_id',
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink'
    }
    await sut.update(fakeUsabilityTest)
    expect(usabilityTestRepositorySpy.usabilityTest).toEqual(fakeUsabilityTest)
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new UpdateUseCase()
    const fakeUsabilityTest = {
      _id: 'any_id',
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink'
    }

    const promise = sut.update(fakeUsabilityTest)
    expect(promise).rejects.toThrow()
  })

  test('should throw if dependecy throws', async () => {
    const usabilityTestRepository = makeUsabilityTestRepositoryWithError()
    const sut = new UpdateUseCase({ usabilityTestRepository })
    const fakeUsabilityTest = {
      _id: 'any_id',
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink'
    }
    const promise = sut.update(fakeUsabilityTest)
    expect(promise).rejects.toThrow()
  })
})
