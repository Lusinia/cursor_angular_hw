// app.js

// define our application and pull in ngRoute and ngAnimate
var shopApp = angular.module('shopApp', ['ngRoute', 'ngAnimate']);

// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
shopApp.config(function ($routeProvider) {

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
        .when('/product/:id', {
            templateUrl: 'partials/product.html',
            controller: 'mainController'
        })

        .otherwise({redirectTo: '/'});

});

// FACTORY 
shopApp.factory('productsFactory', function ($http) {
    var products = [{
        title: "Cat1",
        img: "./img/cat2.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti praesentium accusantium molestias neque assumenda, sit a",
        id: Math.random()

    }, {
        title: "Cat2",
        img: "./img/cat3.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti praesentium accusantium molestias neque assumenda, sit a",
        id: Math.random()
    }, {
        title: "Cat3",
        img: "./img/grief-and-loss.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti praesentium accusantium molestias neque assumenda, sit a",
        id: Math.random()
    }];


    var factory = {};
    factory.getProducts = function () {
        return products;
    };
    factory.postProducts = function (product) {

    };
    return factory;
});

shopApp.factory('ordersFactory', function () {
    var orders = [{
        title: "Milk",
        id: 1
    }, {
        title: "Cat",
        id: 2
    }];
    var factory = {};
    factory.getOrders = function () {
        return orders;
    };

    return factory;
});


// CONTROLLERS ============================================
// home page controller
shopApp.controller('mainController', function ($scope, $location, $routeParams, productsFactory, ordersFactory) { //,  $routeParams
    $scope.pageClass = 'page-style';
    //$scope.templateUrl=  ''+$routeParams.primaryNav+'/'+$routeParams.secondaryNav+'.html';
    $scope.products = [];
    $scope.orders = [];
    $scope.ProductId = $routeParams.id;
    init();

    function init() {
        $scope.products = productsFactory.getProducts();
        $scope.orders = ordersFactory.getOrders();

    }

    $scope.addProduct = function () {
        $scope.products.push({
            title: $scope.newProduct.title,
            img: $scope.newProduct.img,
            desc: $scope.newProduct.desc,
            id: Math.random()
        });

    };
    $scope.addOrderItem = function () {
        $scope.orders.push({
            title: $scope.newProduct.title,
            id: $scope.orders.length + 1
        });
    };
    $scope.removeProduct = function (item) {
        var index = $scope.orders.indexOf(item);
        $scope.orders.splice(index, 1)
    };

    $scope.showProduct = function (item) {
        //  var index = $scope.products.indexOf(item);
        //  var path = $location.path("/"+ item.id);
        //  $scope.profile= item[$routeParams.id];
        console.log(item)
    };




});

