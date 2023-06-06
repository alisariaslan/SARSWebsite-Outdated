const express = require('express')
const router = express.Router();

//GET
router.get('/', function (req, res, next) { res.render('index'); });
router.get('/politics', function (req, res, next) { res.render('politics'); });
router.get('/politics/quickrm', function (req, res, next) { res.render('politics/quickrm'); });
router.get('/politics/quickrmpro', function (req, res, next) { res.render('politics/quickrmpro'); });
router.get('/politics/fitmiyim', function (req, res, next) { res.render('politics/fitmiyim'); });
router.get('/politics/benfit', function (req, res, next) { res.render('politics/benfit'); });
router.get('/politics/apaydinfitness', function (req, res, next) { res.render('politics/apaydinfitness'); });
router.get('/politics/parkor', function (req, res, next) { res.render('politics/parkor'); });
router.get('/politics/fitkal', function (req, res, next) { res.render('politics/fitkal'); });
module.exports = router;