const logger = require('./lib/index');
const contextMiddleware = require('./lib/context/ContextMiddleware');
const RestClient = require('./lib/rest_client/RestClient');
const httpContext = require('express-http-context');

function getConfig() {
   try {
      const config = require(process.cwd() + '/config')
      return config;
    } catch (e) {
      console.log('config is missing(required)');
      throw e;
    }
}

function __logger() {
  return logger(getConfig());
}

module.exports = {
  logger: () => __logger(),
  contextMiddleware: contextMiddleware,
  httpContextMiddleware: httpContext.middleware,
  httpContext: httpContext,
  restClient: RestClient(__logger(), httpContext)
}
