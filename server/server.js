var express = require('express');
var app = express();
var path = require('path');
var data = require('./volumes.json');
var fs = require('fs');
var methodOverride = require("method-override");

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('X-HTTP-Method-Override', 'DELETE');
    next();
});


app.get('/', function (req, res) {
    res.send(data);
});

app.post('/', function (req, res) {
    res.send('Got a POST request');
    data.push(req.body);
    var string = JSON.stringify(data);
    fs.readFile('./volumes.json', 'utf8', function (err, contents) {
        console.log(contents);
    });
    fs.writeFile(__dirname + "/" + 'volumes.json', string, 'utf8', function (err) {
        if (err) return console.error(err);
        console.log('done');
    })


});
app.delete('/product/:id', function (req, res) {
    var index = req.query.index;
    data.splice(index, 1);
    var string = JSON.stringify(data);
    fs.readFile('./volumes.json', 'utf8', function (err, contents) {
        console.log(contents);
    });
    fs.writeFile(__dirname + "/" + 'volumes.json', string, 'utf8', function (err) {
        if (err) return console.error(err);
        console.log('done');
    });

    res.send('delete request');
});
app.listen(8080, function () {
    console.log('Your app listening on port 8080!');
});
