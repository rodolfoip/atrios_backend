const request = require('supertest')
const app = require('../config/app')
const MongoHelper = require('../../infra/helpers/mongo-helper')
let usabilityTestModel

describe('Usability Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    usabilityTestModel = await MongoHelper.getCollection('usability_test')
  })

  beforeEach(async () => {
    await usabilityTestModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return 201 when valid params are provided', async () => {
    await request(app)
      .post('/api/usability-test')
      .send({
        name: 'any_test',
        accessCode: 'any_accessCode',
        prototypeLink: 'any_prototypeLink',
        externalLink: 'any_externalLink'
      })
      .expect(201)
  })

  test('should return 400 if no params are provided', async () => {
    await request(app)
      .post('/api/usability-test')
      .send({})
      .expect(400)
  })
})
