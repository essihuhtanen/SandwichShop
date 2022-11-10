'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

const express = require("express");
const app = express();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 8080;
var connect = require('./models/db');
const receiveTask = require('./rabbit-utils/receiveTask');

const cookieParser = require("cookie-parser");
const writer = require('./utils/writer');
app.use(cookieParser());

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Add headers
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*'); 

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'authorization, Origin, X-Requested-With, Content-Type, Accept');

  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Handle options-request (mainly for CORS preflight request)
app.options('/v1/order', (req, res, next) => {
  const response = writer.respondWithCode(200, '');
  writer.writeJson(res, response);
});

app.options('/v1/sandwich/*', (req, res, next) => {
  const response = writer.respondWithCode(200, '');
  writer.writeJson(res, response);
});

app.options('/v1/user/*', (req, res, next) => {
  const response = writer.respondWithCode(200, '');
  writer.writeJson(res, response);
});


app.options('/v1/user', (req, res, next) => {
  const response = writer.respondWithCode(200, '');
  writer.writeJson(res, response);
});


// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
connect.connectDB();

receiveTask.getTask("rapid-runner-rabbit", "order-update");

