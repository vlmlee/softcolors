var express = require('express');
var router = express.Router();
var tinycolor = require('tinycolor2');
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'SoftColors.io' });
});

router.post('/convert', function(req, res, next) {
    var inputColor = req.body.color;
    var convertedColor = tinycolor(inputColor).desaturate(25).lighten(25).toHexString;
    res.send(convertedColor);
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

router.get('/random', function(req, res, next) {
    var randomColors = [];
    _.times(10, function() {
        var randomColor = tinycolor.random().desaturate(25).lighten(25).toHexString();

        while (randomColor === '#ffffff') {
            randomColor = tinycolor.random().desaturate(25).lighten(25).toHexString();
        }

        randomColors.push(randomColor);
    });
    res.json(randomColors);
});

module.exports = router;
