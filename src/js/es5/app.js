"use strict";

// (() => {
// define our application and pull in ngRoute and ngAnimate
var shopApp = angular.module("shopApp", ["ngRoute", "ngAnimate"]);

// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
shopApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

    // home page
    .when("/", {
        templateUrl: "../partials/home.html",
        controller: "MainController"
    })

    // add page
    .when("/add", {
        templateUrl: "../partials/add.html",
        controller: "AddProduct"
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
    }).otherwise({ redirectTo: "/orders" });

    $locationProvider.html5Mode(true);
}]);
//
// })();