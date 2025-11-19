const express = require('express');
const { chatWithTina } = require('../controllers/tinaController');

const router = express.Router();

router.post('/chat', chatWithTina);

module.exports = router;