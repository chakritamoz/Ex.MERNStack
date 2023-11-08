const express = require('express');
const router = express.Router();

router.get('/employee', (req, res) => {
  res.send('/Get Employee Endpoint');
});

module.exports = router;