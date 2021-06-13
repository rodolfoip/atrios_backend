const requrest = require('supertest')
const app = require('./app')

describe('App setup', () => {
  test('should disable x-powered-by ', async () => {
    app.get('/test_x_powered_by', (req, res) => {
      res.send('')
    })

    const res = await requrest(app).get('/test_x_powered_by')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })
})
