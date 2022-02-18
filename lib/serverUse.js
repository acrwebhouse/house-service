exports.on = function(app) {
  const express = require('express');
  const config = require('./setting/config').config
  const bodyParser = require("body-parser");
  const swaggerUi = require('swagger-ui-express')
  const swaggerFile = require('../swagger_output.json') // 剛剛輸出的 JSON
  const cors = require('cors')
  const cookieParser = require("cookie-parser");
  const nasDir = config.nasDir
  app.use('/resource',express.static(nasDir));
  app.use(cookieParser());
  app.use(cors())
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());
}
