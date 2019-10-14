//TODO: need to write test case, these are just helping function for testing

const logger = require('../index')

const config = {
  logging: {
    appenders: { out: { type: 'stdout', layout: { type: 'basic'} } },
    categories: { default: { appenders: ['out'], level: 'info' } }
  }
}

console.log(logger.contextMiddleware)
logger.logger().info()
logger.logger().info('--single info---')
logger.logger().info('multiple info', 'info1', 'info2')
logger.logger().error('--failed---')

