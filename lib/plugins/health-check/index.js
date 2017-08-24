'use strict'

const register = (server, opts, next) => {
  let base = {
    service: 'ok'
  }

  server.route({
    method: 'GET',
    path: '/hc',
    handler: (req, reply) => {
      reply(base)
    },
    config: {
      auth: false,
      description: `<p>GET /health-check will return 200 reachable</p>`,
      tags: ['healthcheck']
    }
  })

  next()
}

register.attributes = {
  name: 'health-check'
}

module.exports = register
