const express = require('express');
const router = require('./routes/router');

const app = express();

app.use(express.json());


// routes
app.use(router);

//error middleware
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  console.log(`Incoming request to ${req.originalUrl}. Responding with a 404`);
  res.status(404);
  res.render('index', { status: 404, text: 'Not found' });
})

app.use((err, req, res, next) => {
  console.log('in error catch all')
  res.status(500);
  res.render('index', { status: 500, text: 'Internal server error' });
})

//functions to export
let server;
const startServer = (port) => {
  server = app.listen(port);
  console.log(`Listening on port ${port}`);
}

const stopServer = () => {
  server.close();
}

module.exports = { startServer, stopServer };
