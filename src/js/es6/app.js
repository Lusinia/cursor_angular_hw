
    // define our application and pull in ngRoute and ngAnimate
    let shopApp = angular.module("shopApp", ["ui.router", "ngAnimate", "ngStorage", "ngResource"]);

// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
    shopApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
        ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) => {
        // Set default headers every request
            $httpProvider.interceptors.push('httpRequestInterceptor');

        $stateProvider

        // home page
            .state('home', {
                url: '/',

                views: {
                    '': {
                        templateUrl: '../partials/home.html',
                        controller: "MainController"
                    },

                    // the child views will be defined here (absolutely named)
                    'auth': {
                        templateUrl: '../partials/auth.html',
                        controller: "AuthController"
                    }
                }


            })
            // register page
            .state("register", {
                url: '/register',
                templateUrl: "../partials/registerForm.html",
                    controller: "RegController"
            })

            // secret page
            .state("secret", {
                url: '/me',
                templateUrl: "../partials/secretPage.html",
                controller: "ShowUserController"
            })
            // secret page user info
            .state("info", {
                url: '/me/info',
                templateUrl: "../partials/secretPageInfo.html",
                controller: "ShowUserController"
            })
            // secret page user last orders
            .state("lastOrders", {
                url: '/me/orders',
                templateUrl: "../partials/secretPageOrders.html",
                controller: "ShowUserController"
            })
            // secret page user wishes
            .state("wishes", {
                url: '/me/wishes',
                templateUrl: "../partials/secretPageWishes.html",
                controller: "ShowUserController"
            })


            // add page
            .state("add", {
                url: '/add',
                templateUrl: "../partials/add.html",
                controller: "AddProduct"
            })

            // orders page
            .state("orders", {
                url: '/orders',
                templateUrl: "../partials/orders.html",
                controller: "ShowOrders"
            })

            // product page
            .state("product", {
                url: '/product/:id',
                templateUrl: "../partials/product.html",
                controller: "ShowProduct"
            });


         $urlRouterProvider.otherwise( "/orders");

        $locationProvider.html5Mode(true);
    }]);


    // shopApp.run(["$http", "$localStorage", function($http, $localStorage) {
    //     console.log('$localStorage.token', $localStorage.token);
    //      $http.defaults.headers.common.Authorization = 'JWT ' + $localStorage.token;
    // }]);