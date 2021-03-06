# express-glass
A library for tracing a distributed request

This library depends on the following packages:

* **express-http-context** used for storing the trace-id per request scope
* **axios** used for making Http calls
* **log4js** used for generating the logs appended with trace-id

Usage Steps

1. `npm install express-glass`

2. Provide the log4js configuration

First create a config folder in your working directory

`vim config/index.js`

```javascript
const config = {
  logging: {
    appenders: { out: { type: 'stdout', layout: { type: 'basic'} } },
    categories: { default: { appenders: ['out'], level: 'info' } }
  }
}

module.exports = config
```

3. Attach the middlewares with express app

```javascript
const express = require('express');
const {httpContext, contextMiddleware} = require('express-glass');
var app = express();
app.use(httpContext.middleware);
app.use(contextMiddleware)
```

4. Now we can use the logger and restClient any where in the code

```javascript
// import anywhere in the project
const {logger, restClient} = require('express-glass');

//it will forward the current request id to other service
function fetchUser(user_id) {
  //as we are using axios under the hood, we can use all available function provided by axios
  return await restClient.create({url: 'foo.com'}).get(`/users/${user_id}`)
}
//it will log the current request trace id
function foo() {
  logger().info('it's a fun');
}

```

example logs:

```[2019-10-18T19:49:11.980] [INFO] default - it's a fun xRequestId: 5f884282-7d7f-4f8d-aa8b-64340fdbedfd```
```[2019-10-18T19:51:21.924] [INFO] default - Request to Service:, body=>  foo.com/user/1  xRequestId: 5f884282-7d7f-4f8d-aa8b-64340fdbedfd```
