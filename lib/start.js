const env = process.env.NODE_ENV || 'dev'
const conf = require('../config')

if (env === 'production' && conf.newrelic.license_key) {
  require('newrelic')
}

const server = require('./server')()

const start = server
  .then(s => s.start())
  .then(s => console.log(`Server started on port ${conf.port}, in  ${env} mode`)) // eslint-disable-line no-console
  .catch(err => console.error(err)) // eslint-disable-line no-console

module.exports = start
