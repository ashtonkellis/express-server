const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello');
});

router.get('/ping', (req, res) => {
  res.send('pong');
});

router.post('/save', (req, res, next) => {
  res.status(201);
  res.send(JSON.stringify(req.body));
});

module.exports = router;
