const config = {
  logging: {
    appenders: { out: { type: 'stdout', layout: { type: 'basic'} } },
    categories: { default: { appenders: ['out'], level: 'info' } }
  }
}

module.exports = config