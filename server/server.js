var express = require('express');
var app = express();
var path = require('path');
 var data = require('./volumes.json');



app.get('/', function (req, res) {
    res.send(data);
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
