require('dotenv').config();

const { startServer, stopServer }  = require('./src/server');

startServer(process.env.PORT);
