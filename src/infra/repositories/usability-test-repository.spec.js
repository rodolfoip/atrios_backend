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

  test('should throw if no tasks is provided', async () => {
    const sut = makeSut()
    const promise = sut.persist({
      name: 'any_testname',
      accessCode: 'any_code',
      prototypeLink: 'any_link',
      externalLink: 'any_externalLink'
    })
    expect(promise).rejects.toThrow(new MissingParamError('tasks'))
  })

  test('should persist and return new usability test', async () => {
    const sut = makeSut()
    const fakeUsabilityTest = {
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink',
      tasks: []
    }
    const persistedUsabilityTest = await sut.persist(fakeUsabilityTest)
    expect(persistedUsabilityTest).toMatchObject(fakeUsabilityTest)
  })

  test('should throw if no id is provided', async () => {
    const sut = makeSut()
    const promise = sut.remove()
    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })

  test('should remove and return isDeleted usability test', async () => {
    const sut = makeSut()
    let fakeUsabilityTest = {
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink',
      tasks: []
    }
    fakeUsabilityTest = await sut.persist(fakeUsabilityTest)

    const isDeleted = await sut.remove(fakeUsabilityTest._id)
    expect(isDeleted).toBe(true)
  })

  test('should return false no usability test exists', async () => {
    const sut = makeSut()

    const isDeleted = await sut.remove('60cf3ab3e0ca11825aec231s')
    expect(isDeleted).toBe(false)
  })

  test('should return empty usability test list when find is called', async () => {
    const sut = makeSut()
    const list = await sut.find()
    expect(list).toEqual([])
  })

  test('should return usability test list when find is called', async () => {
    const sut = makeSut()
    const fakeUsabilityTest = {
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink'
    }
    await usabilityTestModel.insertOne(fakeUsabilityTest)
    const list = await sut.find()
    expect(list).toEqual([fakeUsabilityTest])
  })

  test('should throw if no id is provided', async () => {
    const sut = makeSut()
    const promise = sut.update({})
    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })

  test('should throw if no name is provided', async () => {
    const sut = makeSut()
    const promise = sut.update({
      _id: 'any_id'
    })
    expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('should throw if no accessCode is provided', async () => {
    const sut = makeSut()
    const promise = sut.update({
      _id: 'any_id',
      name: 'any_test'
    })
    expect(promise).rejects.toThrow(new MissingParamError('accessCode'))
  })

  test('should throw if no prototypeLink is provided', async () => {
    const sut = makeSut()
    const promise = sut.update({
      _id: 'any_id',
      name: 'any_testname',
      accessCode: 'any_code'
    })
    expect(promise).rejects.toThrow(new MissingParamError('prototypeLink'))
  })

  test('should throw if no externalLink is provided', async () => {
    const sut = makeSut()
    const promise = sut.update({
      _id: 'any_id',
      name: 'any_testname',
      accessCode: 'any_code',
      prototypeLink: 'any_link'
    })
    expect(promise).rejects.toThrow(new MissingParamError('externalLink'))
  })

  test('should update and return new usability test', async () => {
    const sut = makeSut()
    let fakeUsabilityTest = {
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink',
      tasks: []
    }
    fakeUsabilityTest = await sut.persist(fakeUsabilityTest)
    const updatedUsabilityTest = await sut.update(fakeUsabilityTest)
    expect(updatedUsabilityTest.value).toMatchObject(fakeUsabilityTest)
  })

  test('should update with news tasks and return usability test', async () => {
    const sut = makeSut()
    let fakeUsabilityTest = {
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink',
      tasks: [
        {
          order: 1,
          description: 'any_description'
        },
        {
          order: 2,
          description: 'any_description'
        }
      ]
    }
    fakeUsabilityTest = await sut.persist(fakeUsabilityTest)
    const updatedUsabilityTest = await sut.update(fakeUsabilityTest)
    expect(updatedUsabilityTest.value).toMatchObject(fakeUsabilityTest)
  })

  test('should throw if no name is provided', () => {
    const sut = makeSut()
    const promise = sut.findByName()
    expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('should return usability test when findByName is called', async () => {
    const sut = makeSut()
    const fakeUsabilityTest = {
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink'
    }
    await usabilityTestModel.insertOne(fakeUsabilityTest)
    const usabilityTest = await sut.findByName(fakeUsabilityTest.name)
    expect(usabilityTest).toEqual(fakeUsabilityTest)
  })

  test('should throw if no access code is provided', () => {
    const sut = makeSut()
    const promise = sut.findByAccessCode()
    expect(promise).rejects.toThrow(new MissingParamError('accessCode'))
  })

  test('should return usability test when findByAccessCode is called', async () => {
    const sut = makeSut()
    const fakeUsabilityTest = {
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink'
    }
    await usabilityTestModel.insertOne(fakeUsabilityTest)
    const usabilityTest = await sut.findByAccessCode(fakeUsabilityTest.accessCode)
    expect(usabilityTest).toEqual(fakeUsabilityTest)
  })

  test('should throw if no id is provided', () => {
    const sut = makeSut()
    const promise = sut.findById()
    expect(promise).rejects.toThrow(new MissingParamError('_id'))
  })

  test('should return usability test when findById is called', async () => {
    const sut = makeSut()
    const fakeUsabilityTest = {
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink'
    }
    const persistedUsabilityTest = await usabilityTestModel.insertOne(fakeUsabilityTest)
    const usabilityTest = await sut.findById(persistedUsabilityTest.ops[0]._id)
    expect(usabilityTest).toEqual(fakeUsabilityTest)
  })
})
