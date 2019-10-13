const axios = require('axios')

function __add_interceptors(__axios, httpContext, logger) {
	__axios.interceptors.request.use(request => {
		request.headers['x-request-id'] = httpContext.get('xRequestId')
		logger.info('Request to Service: %s, body=>%s ', request.baseURL + request.url, JSON.stringify(request.data))
		return request
	})
	__axios.interceptors.response.use(response => {
		logger.info('Response From Service: ', JSON.stringify(response.data))
			return response
		}, function (error) {
			logger.error('error---->', error)
			logger.error('Response from: httpStatus=>%s body=>%s', error.response.status, JSON.stringify(error.response.data));
			return Promise.reject(error);
	})
	return __axios;
}

function RestClient(logger, httpContext) {
  return new Proxy(axios, {
    get: function (target, property) {

      if (Reflect.has(target, property)) {
   		if (property == 'create') {
   			return function() {
   				 //`this` does not matter it can be null
   				const __create = target[property].apply(this, arguments)
   				return __add_interceptors(__create, httpContext, logger);
   			}
   		}
      	__add_interceptors(target, httpContext, logger)
        return Reflect.get(target, property);
      } else {
        return function methodMissing() {
        	if (property) {
          		console.log('method not exist!');
          	}
        }
      }
    }
  });
}


module.exports = RestClient