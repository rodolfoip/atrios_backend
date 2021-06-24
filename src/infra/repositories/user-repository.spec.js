const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const UserRepository = require('./user-repository')
let userModel

const makeSut = () => {
  return new UserRepository()
}

describe('User repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should persist and return new user', async () => {
    const sut = makeSut()
    const fakeUser = {
      name: 'any_user',
      email: 'any_email@test.com',
      password: 'hashed_password'
    }
    const persistedUser = await sut.persist(fakeUser)
    expect(persistedUser).toMatchObject(fakeUser)
  })

  test('should throw if no name is provided', async () => {
    const sut = makeSut()
    const promise = sut.persist({})
    expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('should throw if no email is provided', async () => {
    const sut = makeSut()
    const promise = sut.persist({
      name: 'any_name'
    })
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('should throw if no password is provided', async () => {
    const sut = makeSut()
    const promise = sut.persist({
      name: 'any_name',
      email: 'any_email@test.com'
    })
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})
