'use strict'

const routes = []

routes.push({
  method: 'GET',
  path: '/test',
  handler: (req, reply) => {
    setTimeout(() => {
      reply({ test: true })
    }, 1000)
  }
})

routes.push({
  method: 'GET',
  path: '/fake',
  handler: (req, reply) => {
    reply({ fake: true })
  },
  config: {
    description: `<p>Fake stuff</p>`,
    tags: ['api', 'fake'],
    cors: true
  }
})

module.exports = routes
