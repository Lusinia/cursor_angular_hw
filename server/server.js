var express = require('express');
var app = express();
var path = require('path');
 var data = require('./volumes.json');

var products = data.items;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/', function (req, res) {
    res.send(data);
});

app.post('/', function (req, res) {
    res.send('Got a POST request');
    data.items.push(req);
});
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
