const requrest = require('supertest')
const app = require('../config/app')

describe('Content-Type middleware', () => {
  test('should return json content type as default', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send({})
    })

    await requrest(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
