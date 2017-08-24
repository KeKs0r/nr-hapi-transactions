'use strict'

const routes = require('./routes')

const register = (server, opts, next) => {
  server.route(routes)
  next()
}

register.attributes = {
  name: 'api'
}

module.exports = register