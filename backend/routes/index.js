// External dependencies
const express = require('express');
const router = express.Router();

// Internal dependencies
const apiRouter = require('./api');

// Moute routes
router.use('/api', apiRouter);

// Test route
router.get('/test', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('hello world!');
})

module.exports = router;