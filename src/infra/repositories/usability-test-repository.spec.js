const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const UsabilityTestRepository = require('./usability-test-repository')
let usabilityTestModel

const makeSut = () => {
  return new UsabilityTestRepository()
}

describe('Usability test repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    usabilityTestModel = await MongoHelper.getCollection('usability_tests')
  })

  beforeEach(async () => {
    await usabilityTestModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should throw if no name is provided', async () => {
    const sut = makeSut()
    const promise = sut.persist({})
    expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('should throw if no accessCode is provided', async () => {
    const sut = makeSut()
    const promise = sut.persist({
      name: 'any_testname'
    })
    expect(promise).rejects.toThrow(new MissingParamError('accessCode'))
  })

  test('should throw if no prototypeLink is provided', async () => {
    const sut = makeSut()
    const promise = sut.persist({
      name: 'any_testname',
      accessCode: 'any_code'
    })
    expect(promise).rejects.toThrow(new MissingParamError('prototypeLink'))
  })

  test('should throw if no externalLink is provided', async () => {
    const sut = makeSut()
    const promise = sut.persist({
      name: 'any_testname',
      accessCode: 'any_code',
      prototypeLink: 'any_link'
    })
    expect(promise).rejects.toThrow(new MissingParamError('externalLink'))
  })

  test('should persist and return new usability test', async () => {
    const sut = makeSut()
    const fakeUsabilityTest = {
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink'
    }
    const persistedUsabilityTest = await sut.persist(fakeUsabilityTest)
    expect(persistedUsabilityTest).toMatchObject(fakeUsabilityTest)
  })
})
