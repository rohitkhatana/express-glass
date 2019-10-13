const logger = require('../index')

const config = {
  logging: {
    appenders: { out: { type: 'stdout', layout: { type: 'basic'} } },
    categories: { default: { appenders: ['out'], level: 'info' } }
  }
}

console.log(logger.contextMiddleware)
console.log(logger.logger().info('----foo-----'))

//test1 requestId should be logged if not available

//test1 if config is not available throw error

