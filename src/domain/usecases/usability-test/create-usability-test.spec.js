const { MissingParamError } = require('../../../utils/errors')
const CreateUseCase = require('./create-usability-test')

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
    async persist ({ name, accessCode, prototypeLink, externalLink }) {
      this.name = name
      this.accessCode = accessCode
      this.prototypeLink = prototypeLink
      this.externalLink = externalLink
      return this.user
    }
  }
  const usabilityTestRepositorySpy = new UsabilityTestRepositorySpy()
  usabilityTestRepositorySpy.usabilityTest = {
    name: 'any_test',
    accessCode: 'any_accessCode',
    prototypeLink: 'any_prototypeLink',
    externalLink: 'any_externalLink',
    userId: 'any_userId'
  }
  return usabilityTestRepositorySpy
}

const makeUsabilityTestRepositoryWithError = () => {
  class UsabilityTestRepositorySpy {
    async create ({ name, accessCode, prototypeLink, externalLink }) {
      throw new Error()
    }
  }

  return new UsabilityTestRepositorySpy()
}

describe('Create usability test', () => {
  test('should return null if no name is provided', () => {
    const { sut } = makeSut()
    const promise = sut.create({})
    expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('should return null if no accessCode is provided', () => {
    const { sut } = makeSut()
    const promise = sut.create({
      name: 'any_testname'
    })
    expect(promise).rejects.toThrow(new MissingParamError('accessCode'))
  })

  test('should return null if no prototypeLink is provided', () => {
    const { sut } = makeSut()
    const promise = sut.create({
      name: 'any_testname',
      accessCode: 'any_access_code'

    })
    expect(promise).rejects.toThrow(new MissingParamError('prototypeLink'))
  })

  test('should return null if no externalLink is provided', () => {
    const { sut } = makeSut()
    const promise = sut.create({
      name: 'any_testname',
      accessCode: 'any_access_code',
      prototypeLink: 'any_prototype_link'
    })
    expect(promise).rejects.toThrow(new MissingParamError('externalLink'))
  })

  test('should return usabilityTest when call create', async () => {
    const { sut, usabilityTestRepositorySpy } = makeSut()
    const fakeUsabilityTest = {
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink',
      userId: 'any_userId'
    }
    await sut.create(fakeUsabilityTest)
    expect(usabilityTestRepositorySpy.usabilityTest).toEqual(fakeUsabilityTest)
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new CreateUseCase()
    const fakeUsabilityTest = {
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink'
    }

    const promise = sut.create(fakeUsabilityTest)
    expect(promise).rejects.toThrow()
  })

  test('should throw if dependecy throws', async () => {
    const usabilityTestRepository = makeUsabilityTestRepositoryWithError()
    const sut = new CreateUseCase({ usabilityTestRepository })
    const fakeUsabilityTest = {
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink'
    }
    const promise = sut.create(fakeUsabilityTest)
    expect(promise).rejects.toThrow()
  })
})
