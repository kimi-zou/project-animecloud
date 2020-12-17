const router = require('express').Router();

// API test route
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;