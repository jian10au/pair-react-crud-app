const express = require('express');
const router = express.Router();

const { index } = require('../controllers/music-controller');

router.get('/test', index);

module.exports = router;