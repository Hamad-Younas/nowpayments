const express = require('express');
const router = express.Router();
const { AddSub } = require('./controller/data.js');

router.get('/add',  AddSub);

module.exports = router;
