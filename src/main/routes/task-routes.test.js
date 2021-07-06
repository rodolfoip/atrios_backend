const request = require('supertest')
const app = require('../config/app')
const MongoHelper = require('../../infra/helpers/mongo-helper')
let usabilityTestModel

describe('Task routes', () => {
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

  test('should return 201 when valid params are provided', async () => {
    let fakeUsabilityTest = await usabilityTestModel.insertOne({
      name: 'any_tests',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink',
      tasks: []
    })
    fakeUsabilityTest = fakeUsabilityTest.ops[0]

    await request(app)
      .post('/api/usability-test/task')
      .send({
        testId: fakeUsabilityTest._id,
        order: 1,
        description: 'any_description'
      })
      .expect(201)
  })

  test('should return 400 when invalid params are provided', async () => {
    await request(app)
      .post('/api/usability-test/task')
      .send({
        order: 1,
        description: 'any_description'
      })
      .expect(400)
  })

  test('should return 204 when valid params are provided', async () => {
    let fakeUsabilityTest = await usabilityTestModel.insertOne({
      name: 'any_tests',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink',
      tasks: [
        {
          order: 1,
          description: 'any_description'
        }
      ]
    })
    fakeUsabilityTest = fakeUsabilityTest.ops[0]

    await request(app)
      .put('/api/usability-test/task')
      .send({
        testId: fakeUsabilityTest._id,
        order: 1,
        description: 'other_description'
      })
      .expect(204)
  })

  test('should return 400 when invalid params are provided', async () => {
    await request(app)
      .put('/api/usability-test/task')
      .send({
        order: 1,
        description: 'any_description'
      })
      .expect(400)
  })

  test('should return 204 when valid params are provided', async () => {
    let fakeUsabilityTest = await usabilityTestModel.insertOne({
      name: 'any_tests',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink',
      tasks: [
        {
          order: 1,
          description: 'any_description'
        }
      ]
    })
    fakeUsabilityTest = fakeUsabilityTest.ops[0]

    await request(app)
      .delete('/api/usability-test/task')
      .send({
        testId: fakeUsabilityTest._id,
        order: 1
      })
      .expect(204)
  })

  test('should return 400 when invalid params are provided', async () => {
    await request(app)
      .delete('/api/usability-test/task')
      .send({
        order: 1
      })
      .expect(400)
  })
})
