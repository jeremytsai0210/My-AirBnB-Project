// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

router.use('/api', apiRouter);

module.exports = router;