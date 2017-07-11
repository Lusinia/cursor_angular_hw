'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = undefined;

var _module = require('../module/module');

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
var config = exports.config = function config() {
    _module2.default.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider

        // home page
        .when("/", {
            templateUrl: "../partials/home.html",
            controller: "mainController"
        })

        // add page
        .when("/add", {
            templateUrl: "../partials/add.html",
            controller: "addProduct"
        })

        // orders page
        .when("/orders", {
            templateUrl: "../partials/orders.html",
            controller: "ShowOrders"
        })

        // product page
        .when("/product/:id", {
            templateUrl: "../partials/product.html",
            controller: "ShowProduct"
        }).otherwise({ redirectTo: "/" });
        // $locationProvider.html5Mode(true);
    }]);
};