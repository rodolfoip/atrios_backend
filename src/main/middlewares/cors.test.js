const requrest = require('supertest')
const app = require('../config/app')

describe('CORS middleware', () => {
  test('should enable CORS ', async () => {
    app.get('/test_cors', (req, res) => {
      res.send('')
    })

    const res = await requrest(app).get('/test_cors')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
