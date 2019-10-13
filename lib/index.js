const Log4js = require('log4js');
const httpContext = require('express-http-context');

var formatMessage = function(message) {
  var reqId = httpContext.get('xRequestId');
  if (reqId) {
    message.push("xRequestId: " + reqId)
  }
  return message.join(" ");
};


module.exports = (config) => {
  Log4js.configure(config.logging);
  const logger = Log4js.getLogger();
  const supportLogMethods = ['info', 'error', 'warn', 'debug', 'trace', 'fatal']
  return new Proxy(logger, {
    get: (target, property) => {
      if(supportLogMethods.includes(property)) {
        return function () {
          var __arguments = Array.prototype.slice.call(arguments);
          return target[property].call(this, formatMessage(__arguments))
        }
      }
      return Reflect.get(target, property)
    }
  })
}
