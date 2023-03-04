const express = require('express')
const router = express.Router();

//GET
router.get('/', function (req, res, next) { res.render('index'); });
//GET
router.get('/policy', function (req, res, next) { res.render('policy'); });

module.exports = router;