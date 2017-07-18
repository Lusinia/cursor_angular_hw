var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var _ = require("lodash");
var methodOverride = require("method-override");
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");

var data = require('./models/volumes.json');
var users = require('./models/users.json');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'noMoreSecrets';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    
    var user = users[_.findIndex(users, {id: jwt_payload.id})];
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
// For put/delete requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('X-HTTP-Method-Override', 'DELETE');
    next();
});

// Auth
app.use(passport.initialize());

// app.use(function myauth(req, res, next) {
//     req.challenge = req.get('Authorization');
//     req.authenticated = req.authentication === 'secret';
//     if (req.authenticated) {
//         req.authentication = { user: 'bob' };
//     } else {
//         req.authentication = { error: 'INVALID_API_KEY' };
//     }
//
//     next();
// });



// function getUnauthorizedResponse(req) {
//     return req.auth ?
//         ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected') :
//         'No credentials provided'
// }

// Routes
//Indes route
app.get('/', function (req, res) {
    console.log(users);
    res.send(data);
});

// Create route
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

// Delete  route
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


//Login route
app.post('/auth/login',   function(req, res) {
    console.log(req)
    if(req.body.name && req.body.password){
        var name = req.body.name;
        var password = req.body.password;
    }

    var user = users[_.findIndex(users, {username: name})];
    if( ! user ){
        res.status(401).json({message:"no such user found"});
    }

    if(user.password === req.body.password) {
        var payload = {id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message: "ok", token: token});
    } else {
        res.status(401).json({message:"passwords did not match"});
    }
});
// Register route
app.get('/auth/register',  function(req, res) {
    if(req.body.name && req.body.password){
        var name = req.body.name;
        var password = req.body.password;
    }
    users.push({
        username: name,
        password: password
    })

});
// User Profile
app.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user.profile);
    }
);
// Secret page route
app.get("/auth/secret", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json("Success! You can not see this without a token");
});
// Test
app.get("/auth/quote", function(req, res){
    res.json("Success! You can not see this without a token");
});



app.listen(8080, function () {
    console.log('Your app listening on port 8080!');
});
