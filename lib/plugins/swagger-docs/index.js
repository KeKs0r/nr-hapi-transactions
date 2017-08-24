'use strict'

const inert = require('inert')
const vision = require('vision')
const swagger = require('hapi-swagger')

const register = (server, opts, next) => {
  if (!opts.name || !opts.version) {
    return next(new Error('missing opts.name and/or opts.version'))
  }

  const plugins = [
    inert,
    vision,
    {
      register: swagger,
      options: {
        pathPrefixSize: 2,
        documentationPath: '/docs',
        expanded: 'none',
        info: {
          title: `${opts.name} API docs`,
          version: opts.version
        }
      }
    }
  ]

  server.register(plugins)
      .then(next)
      .catch(next)
}

register.attributes = {
  name: 'swagger-docs'
}

module.exports = register
