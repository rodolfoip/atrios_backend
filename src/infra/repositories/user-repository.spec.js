const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
let userModel

class UserRepository {
  async persist ({ name, email, password }) {
    if (!name) {
      throw new MissingParamError('name')
    }
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
    const userModel = await MongoHelper.getCollection('users')
    const user = await userModel.insertOne({
      name,
      email,
      password
    })
    return user.ops[0]
  }
}
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
