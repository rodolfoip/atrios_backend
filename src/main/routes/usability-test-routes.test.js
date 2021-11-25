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
        externalLink: 'any_externalLink',
        userId: 'any_userId'
      })
      .expect(201)
  })

  test('should return 400 if no params are provided', async () => {
    await request(app)
      .post('/api/usability-test')
      .send({})
      .expect(400)
  })

  test('should return 204 when valid params are provided', async () => {
    let fakeUsabilityTest = await usabilityTestModel.insertOne({
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink'
    })
    fakeUsabilityTest = fakeUsabilityTest.ops[0]

    await request(app)
      .delete('/api/usability-test')
      .send({
        id: fakeUsabilityTest._id
      })
      .expect(204)
  })

  test('should return 200 when valid params are provided', async () => {
    await usabilityTestModel.insertOne({
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink',
      userId: 'any_userId'
    })
    await request(app)
      .get('/api/usability-test/any_userId')
      .expect(200)
  })

  test('should return 200 when valid params are provided - update', async () => {
    let fakeUsabilityTest = await usabilityTestModel.insertOne({
      name: 'any_test',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink',
      userId: 'any_userId'
    })
    fakeUsabilityTest = fakeUsabilityTest.ops[0]

    await request(app)
      .put('/api/usability-test')
      .send(fakeUsabilityTest)
      .expect(200)
  })

  test('should return 200 when valid params are provided', async () => {
    await usabilityTestModel.insertOne({
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink',
      userId: 'any_userId'
    })
    await request(app)
      .get('/api/usability-test/name/any_test')
      .expect(200)
  })

  test('should return 200 when valid params are provided', async () => {
    await usabilityTestModel.insertOne({
      name: 'any_test',
      accessCode: 'any_accessCode',
      prototypeLink: 'any_prototypeLink',
      externalLink: 'any_externalLink'
    })
    await request(app)
      .get('/api/usability-test/accesscode/any_accessCode')
      .expect(200)
  })
})
