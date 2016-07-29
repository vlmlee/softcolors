var express = require('express');
var router = express.Router();
var tinycolor = require('tinycolor2');
var _ = require('underscore');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'SoftColors.io' });
});

router.get('/convert', function(req, res, next) {
    res.sendFile('convert-colors.hbs', {
        root: path.join(__dirname, '../views')
    });
});

router.post('/convertColor', function(req, res, next) {
    var colors = {};
    var inputColor = req.body.hex || req.body.rgb;
    colors.hex = tinycolor(inputColor).toHexString();
    colors.rgb = tinycolor(inputColor).toRgbString();
    colors.softRgb = tinycolor(inputColor).desaturate(20).lighten(20).toRgbString();
    colors.softHex = tinycolor(inputColor).desaturate(20).lighten(20).toHexString();
    res.json(colors);
});

router.get('/choose', function(req, res, next) {
    var preselectedColors = [
        '#FF6600',
        '#18AF90',
        '#2F9BB7',
        '#FFD65A',
        '#FF884D',
        '#9CABE4',
        '#DADADA',
        '#81B9C3',
        '#B388DD',
        '#FC7D74'
    ];
    res.json(preselectedColors);
});

router.get('/chooseColor', function(req, res, next) {
    res.sendFile('color-boxes.hbs', {
        root: path.join(__dirname, '../views')
    });
});

router.get('/random', function(req, res, next) {
    var randomColors = [];
    _.times(10, function() {
        var randomColor = tinycolor.random().desaturate(10).lighten(10).toHexString();

        while (randomColor === '#ffffff') {
            randomColor = tinycolor.random().desaturate(10).lighten(10).toHexString();
        }

        randomColors.push(randomColor);
    });
    res.json(randomColors);
});

module.exports = router;
