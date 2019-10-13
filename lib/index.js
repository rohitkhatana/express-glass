const Log4js = require('log4js');
const httpContext = require('express-http-context');

var formatMessage = function(...message) {
    var reqId = httpContext.get('xRequestId');
    message = reqId ? message + " xRequestId: " + reqId : message;
    return message;
};


var logger = {
  info: (...message) => {
	  Log4js.getLogger().info(formatMessage(...message));
  },

  error: (...message) => {
	  Log4js.getLogger().error(formatMessage(...message));
  },

  warn: (...message) => {
    Log4js.getLogger().warn(formatMessage(...message));
  },

  debug: (...message) => {
    Log4js.getLogger().debug(formatMessage(...message));
  },

  trace: (...message) => {
    Log4js.getLogger().trace(formatMessage(...message));
  },

  fatal: (...message) => {
    Log4js.getLogger().fatal(formatMessage(...message));
  },

}

module.exports = (config) => {
  Log4js.configure(config.logging);
  return logger;
}
