'use strict'

const pino = require('pino')
const conf = require('../../config')
const logger = pino(conf.pino)

module.exports = logger
