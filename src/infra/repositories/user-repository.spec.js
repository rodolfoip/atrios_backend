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
})
