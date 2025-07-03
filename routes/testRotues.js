const express = require('express');
const router = express.Router();
const controller = require('../controllers/testController');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/submit', controller.submitAnswers);

module.exports = router;
