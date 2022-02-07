const express = require('express');
const app = express();
const config = require('./lib/setting/config').config;
const serverPort = config.serverPort;
const server = require('http').createServer(app);
const serverUse=require('./lib/serverUse');
const houseRestApi = require("./lib/rest_api/house");

console.log('config',config)

serverUse.on(app);
houseRestApi.on(app);

server.listen(serverPort);
console.log("現在使用" + serverPort + " port");