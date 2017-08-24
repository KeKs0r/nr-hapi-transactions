'use strict'

const Path = require('path')
const { isEmpty } = require('lodash/fp')
const dotenv = require('dotenv')
const pkg = require('../package.json')
const assert = require('assert')

let conf = {}

// Load Local Environment
const envPath = Path.join(__dirname, '.env')
dotenv.load({ path: envPath })

// Bools to determine which state we are running in
conf.isProd = /production/i.test(process.env.NODE_ENV)
conf.isTest = /test/i.test(process.env.NODE_ENV)
conf.isCI = /true/i.test(process.env.CI)

// Swagger options
conf.swagger = {
  name: pkg.name,
  version: pkg.version
}

conf.route = {
  prefix: '/api'
}

// Debug options for Hapi
conf.pino = {
  level: conf.isTest ? 'warn' : 'debug'
}

// route options for Hapi
conf.routes = {
  opts: {
    response: {
      sample: conf.isProd ? 0 : 100
    }
  }
}

// server state options for Hapi
conf.state = {
  opts: {
    ttl: null,
    encoding: 'none'
  }
}

conf.host = 'localhost'
conf.port = 3010

const {
  NEWRELIC_APP,
  NEWRELIC_LICENSE
} = process.env

conf.newrelic = {
  app_name: NEWRELIC_APP || 'default-app',
  license_key: NEWRELIC_LICENSE
}

module.exports = conf
