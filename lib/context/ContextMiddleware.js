var httpContext = require('express-http-context')
var uuidv4 = require('uuidv4');

const xRequestId = 'x-request-id';

module.exports = (req, res, next) => {
	httpContext.ns.bindEmitter(req);
    httpContext.ns.bindEmitter(res);
	const requestId = req.headers[xRequestId] ? req.headers[xRequestId] : uuidv4()
    httpContext.set('xRequestId', requestId);
    next();
}
