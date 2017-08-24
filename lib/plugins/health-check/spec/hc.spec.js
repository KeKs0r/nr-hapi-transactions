jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
const startServer = require('../../../server')
let server

beforeAll(() => {
  return startServer().then((s) => {
    server = s
  })
})

afterAll(() => {
  return server && server.stop({timeout: 100})
})

test('helthcheck', () => {
  const params = {
    method: 'GET',
    url: '/api/hc'
  }

  return server.injectThen(params)
    .then((res) => {
      expect(res.statusCode).toBe(200)
    })
})
