'use strict'

// External modules, etc
const hapi = require('hapi')

// Our  config
const conf = require('../config')

// Pino conf
const logger = require('./logger')
const pinoConf = Object.assign({}, conf.pino, { instance: logger })

function start() {
  const server = new hapi.Server()

  // Server connection setup
  server.connection({ host: conf.host, port: conf.port, routes: conf.routes.opts })

  // Route Prefix
  server.realm.modifiers.route.prefix = conf.route.prefix

  // Plugins + Routes
  const plugins = [
    { register: require('hapi-pino'), options: pinoConf },
    { register: require('./plugins/swagger-docs'), options: conf.swagger },
    require('./plugins/health-check'),
    require('./plugins/fake-plugin'),
  ]

  // Test Environment
  if (/test/i.test(process.env.NODE_ENV)) {
    plugins.push(require('inject-then'))
  }

  // Register plugins, start and return server
  return server.register(plugins)
    .then(() => Promise.resolve(server))
}

// Autoconf loading on export
module.exports = start
