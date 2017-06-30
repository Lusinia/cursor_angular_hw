// app.js

// define our application and pull in ngRoute and ngAnimate
var shopApp = angular.module('shopApp', ['ngRoute', 'ngAnimate']);

// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
shopApp.config(function($routeProvider) {

    $routeProvider

    // home page
        .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'mainController'
    })

    // add page
    .when('/add', {
        templateUrl: 'partials/add.html',
        controller: 'mainController'
    })

    // orders page
    .when('/orders', {
        templateUrl: 'partials/orders.html',
        controller: 'mainController'
    })

    // product page
    .when('/product', {
        templateUrl: 'partials/product.html',
        controller: 'mainController'
    })

    .otherwise({ redirectTo: '/' });

});

// FACTORY 
shopApp.factory('productsFactory', function($http) {
    var products = [{
        title: "Milk",
        img: "http://lorempixel.com/400/200/food",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti praesentium accusantium molestias neque assumenda, sit a",
        id: Math.random()

    }, {
        title: "Cat",
        img: "http://lorempixel.com/400/200/cats",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti praesentium accusantium molestias neque assumenda, sit a",
        id: Math.random()
    }, {
        title: "Lviv",
        img: "http://lorempixel.com/400/200/city",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti praesentium accusantium molestias neque assumenda, sit a",
        id: Math.random()
    }];


    var factory = {};
    factory.getProducts = function() {
        return products;
    };
    factory.postProducts = function(product) {

    };
    return factory;
})

shopApp.factory('ordersFactory', function() {
    var orders = [{
        title: "Milk",
        id: 1
    }, {
        title: "Cat",
        id: 2
    }];
    var factory = {};
    factory.getOrders = function() {
        return orders;
    };

    return factory;
})



// CONTROLLERS ============================================
// home page controller
shopApp.controller('mainController', function($scope, productsFactory, ordersFactory) { //,  $routeParams
    $scope.pageClass = 'page-style';
    //$scope.templateUrl=  ''+$routeParams.primaryNav+'/'+$routeParams.secondaryNav+'.html';
    $scope.products = [];
    $scope.orders = [];

    init();

    function init() {
        $scope.products = productsFactory.getProducts();
        $scope.orders = ordersFactory.getOrders();
    };

    $scope.addProduct = function() {
        $scope.products.push({
            title: $scope.newProduct.title,
            img: $scope.newProduct.img,
            desc: $scope.newProduct.desc,
            id: Math.random()

        })
    }
    $scope.addOrderItem = function() {
        $scope.orders.push({
            title: $scope.newProduct.title,
            id: $scope.orders.length + 1
        })
    }
     $scope.removeOrderFromList = function() {
        $scope.orders.splice($scope.)
    }


});
