const axios = require('axios');
var uuidv4 = require('uuidv4');

function __add_interceptors(__axios, httpContext, logger) {
  if (__axios.interceptors.request.handlers.length == 0) {
    __axios.interceptors.request.use(request => {
      request.headers['x-request-id'] = httpContext.get('xRequestId') || uuidv4();
      var url = request.baseURL ? request.baseURL + request.url : request.url;
      logger.info('Request to Service:, body=> ', url, JSON.stringify(request.data))
      return request
    })
  }
  if (__axios.interceptors.response.handlers.length == 0) {
    __axios.interceptors.response.use(response => {
      logger.info('Response From Service: ', JSON.stringify(response.data))
        return response
      }, function (error) {
        logger.error('Response from: httpStatus=>%s body=>%s', error.response.status, JSON.stringify(error.response.data));
        return Promise.reject(error);
    })
  }
  return __axios;
}

function RestClient(logger, httpContext) {
  return new Proxy(axios, {
    get: function (target, property) {

      if (Reflect.has(target, property)) {
        if (property == 'create') {
          return function() {
            //this does not matter it can be null
            const __create = target[property].apply(this, arguments)
            return __add_interceptors(__create, httpContext, logger);
          }
        } else {
          __add_interceptors(target, httpContext, logger)
          return Reflect.get(target, property);
        }
      } else {
        return function methodMissing() {
          if (property) {
              console.log('you called  but it doesn\'t exist!');
            }
        }
      }
    }
  });
}


module.exports = RestClient