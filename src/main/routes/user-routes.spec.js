const request = require('supertest')
const app = require('../config/app')
const MongoHelper = require('../../infra/helpers/mongo-helper')
let userModel

describe('User routes', () => {
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

  test('should return 201 when valid params are provided', async () => {
    await request(app)
      .post('/api/user')
      .send({
        name: 'any_user',
        email: 'any_email@test.com',
        password: 'hashed_password'
      })
      .expect(201)
  })

  test('should return 400 if no params are provided', async () => {
    await request(app)
      .post('/api/user')
      .send({})
      .expect(400)
  })
})
