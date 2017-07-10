"use strict";

// define our application and pull in ngRoute and ngAnimate
var shopApp = angular.module("shopApp", ["ngRoute", "ngAnimate"]);
//
// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
shopApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

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

// FACTORY
shopApp.factory("productsFactory", ["$http", function ($http) {

    var recieveData = function recieveData() {
        return $http.get('http://localhost:3000/');
    };
    var products = [];
    console.log('products', products);

    var factory = {};
    factory.getJSON = function () {
        return recieveData();
    };
    factory.getProducts = function () {
        console.log('products', products);

        return products;
    };
    factory.setProducts = function (data) {
        $http.post('http://localhost:3000/', data).success(function (data, status, headers, config) {}).error(function (data, status, header, config) {});
        // products = data;
    };
    factory.addProduct = function (item) {
        $http({
            method: 'post',
            url: 'https://www.googleapis.com/books/v1/volumes?q=star',
            data: item,
            config: 'Content-Type: application/json;'
        }).then(function (response) {
            console.log(response);
        }, function (response) {
            console.log(response);
        });

        //products.push(item);
        console.log('products', products);
    };
    factory.findProductById = function (id) {
        var found = void 0;
        products.forEach(function (product) {
            if (product.id == id) {
                found = product;
            }
        });
        return found;
    };
    return factory;
}]);

shopApp.factory("ordersFactory", function () {
    var orders = [{
        id: 1,
        title: "Cat in the dark",
        img: './img/cat2.jpg',
        desc: "Its just me",
        quantity: 1
    }];
    var factory = {};
    factory.getOrders = function () {
        return orders;
    };

    factory.addOrder = function (item) {

        if (orders.length > 0) {
            var isCoincidence = false;
            orders.forEach(function (order) {
                if (item.title === order.title) {
                    isCoincidence = true;
                    order.quantity++;
                }
            });
            if (!isCoincidence) {
                orders.push(item);
            }
        }
    };

    return factory;
});

// CONTROLLERS ============================================
// home page controller
shopApp.controller("mainController", ["$scope", "$location", "$routeParams", "productsFactory", "ordersFactory", function ($scope, $location, $routeParams, productsFactory, ordersFactory) {
    $scope.pageStyle = 'mainPageStyle';
    $scope.pageClass = "page-style";
    $scope.products = [];
    $scope.orders = [];
    $scope.item = {};

    var createList = function createList() {
        productsFactory.getJSON().then(function (items) {
            var list = [];
            items.data.items.forEach(function (key) {
                var listItem = {};

                //listItem.desc = key.searchInfo.textSnippet ? key.searchInfo.textSnippet  : key.volumeInfo.description;
                listItem.title = key.volumeInfo.title;
                listItem.img = key.volumeInfo.imageLinks.thumbnail;
                //    listItem.author = key.volumeInfo.authors[0] ? key.volumeInfo.authors[0]  : '';
                // listItem.category = (!key.volumeInfo.categories[0]) ?  ''  : key.volumeInfo.categories[0];
                listItem.id = key.id;
                list.push(listItem);
            });
            productsFactory.setProducts(list);
            $scope.products = productsFactory.getProducts();
            console.log('items.data.items', items.data.items);
        });
    };

    var init = function init() {
        $scope.products = createList();
        $scope.orders = ordersFactory.getOrders();
    };

    init();
}]);

shopApp.controller("ShowProduct", ["$scope", "$routeParams", "productsFactory", "ordersFactory", function ($scope, $routeParams, productsFactory, ordersFactory) {
    $scope.pageStyle = 'showProductStyle';
    $scope.ProductId = $routeParams.id;
    var currentProduct = productsFactory.findProductById($scope.ProductId);
    $scope.img = currentProduct.img;
    $scope.title = currentProduct.title;
    $scope.desc = currentProduct.desc;
    $scope.author = currentProduct.author;
    $scope.addOrder = function (item) {
        ordersFactory.addOrder({
            title: currentProduct.title,
            id: ordersFactory.getOrders().length + 1,
            quantity: 1
        });
    };
}]);

shopApp.controller("ShowOrders", ["$scope", "$routeParams", "productsFactory", "ordersFactory", function ($scope, $routeParams, productsFactory, ordersFactory) {
    $scope.pageStyle = 'showOrdersStyle';
    $scope.orders = [];
    $scope.item = {};
    $scope.selected = { value: 0 };
    var init = function init() {
        $scope.orders = ordersFactory.getOrders();
        console.log(' $scope.orders', $scope.orders);
    };

    init();
    $scope.removeOrder = function (item) {
        if ($scope.orders[item].quantity > 1) {
            console.log($scope.orders[item].quantity);
            $scope.orders[item].quantity -= 1;
        } else if ($scope.orders[item].quantity === 1) {
            $scope.orders.splice(item, 1);
            console.log('item', item);
        }
    };
}]);

shopApp.controller("addProduct", ["$scope", "productsFactory", function ($scope, productsFactory) {
    $scope.pageStyle = 'addStyle';

    $scope.addProduct = function () {
        productsFactory.addProduct({
            title: $scope.newProduct.title,
            img: $scope.newProduct.img,
            desc: $scope.newProduct.desc,
            id: Math.random()
        });
    };
}]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGRlZmluZSBvdXIgYXBwbGljYXRpb24gYW5kIHB1bGwgaW4gbmdSb3V0ZSBhbmQgbmdBbmltYXRlXG52YXIgc2hvcEFwcCA9IGFuZ3VsYXIubW9kdWxlKFwic2hvcEFwcFwiLCBbXCJuZ1JvdXRlXCIsIFwibmdBbmltYXRlXCJdKTtcbi8vXG4vLyBST1VUSU5HID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBzZXQgb3VyIHJvdXRpbmcgZm9yIHRoaXMgYXBwbGljYXRpb25cbi8vIGVhY2ggcm91dGUgd2lsbCBwdWxsIGluIGEgZGlmZmVyZW50IGNvbnRyb2xsZXJcbnNob3BBcHAuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInLCBmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAkcm91dGVQcm92aWRlclxuXG4gICAgLy8gaG9tZSBwYWdlXG4gICAgLndoZW4oXCIvXCIsIHtcbiAgICAgICAgdGVtcGxhdGVVcmw6IFwiLi4vcGFydGlhbHMvaG9tZS5odG1sXCIsXG4gICAgICAgIGNvbnRyb2xsZXI6IFwibWFpbkNvbnRyb2xsZXJcIlxuICAgIH0pXG5cbiAgICAvLyBhZGQgcGFnZVxuICAgIC53aGVuKFwiL2FkZFwiLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiBcIi4uL3BhcnRpYWxzL2FkZC5odG1sXCIsXG4gICAgICAgIGNvbnRyb2xsZXI6IFwiYWRkUHJvZHVjdFwiXG4gICAgfSlcblxuICAgIC8vIG9yZGVycyBwYWdlXG4gICAgLndoZW4oXCIvb3JkZXJzXCIsIHtcbiAgICAgICAgdGVtcGxhdGVVcmw6IFwiLi4vcGFydGlhbHMvb3JkZXJzLmh0bWxcIixcbiAgICAgICAgY29udHJvbGxlcjogXCJTaG93T3JkZXJzXCJcbiAgICB9KVxuXG4gICAgLy8gcHJvZHVjdCBwYWdlXG4gICAgLndoZW4oXCIvcHJvZHVjdC86aWRcIiwge1xuICAgICAgICB0ZW1wbGF0ZVVybDogXCIuLi9wYXJ0aWFscy9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgY29udHJvbGxlcjogXCJTaG93UHJvZHVjdFwiXG4gICAgfSkub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogXCIvXCIgfSk7XG4gICAgLy8gJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xufV0pO1xuXG4vLyBGQUNUT1JZXG5zaG9wQXBwLmZhY3RvcnkoXCJwcm9kdWN0c0ZhY3RvcnlcIiwgW1wiJGh0dHBcIiwgZnVuY3Rpb24gKCRodHRwKSB7XG5cbiAgICB2YXIgcmVjaWV2ZURhdGEgPSBmdW5jdGlvbiByZWNpZXZlRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAwLycpO1xuICAgIH07XG4gICAgdmFyIHByb2R1Y3RzID0gW107XG4gICAgY29uc29sZS5sb2coJ3Byb2R1Y3RzJywgcHJvZHVjdHMpO1xuXG4gICAgdmFyIGZhY3RvcnkgPSB7fTtcbiAgICBmYWN0b3J5LmdldEpTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZWNpZXZlRGF0YSgpO1xuICAgIH07XG4gICAgZmFjdG9yeS5nZXRQcm9kdWN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Byb2R1Y3RzJywgcHJvZHVjdHMpO1xuXG4gICAgICAgIHJldHVybiBwcm9kdWN0cztcbiAgICB9O1xuICAgIGZhY3Rvcnkuc2V0UHJvZHVjdHMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAkaHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvJywgZGF0YSkuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHt9KS5lcnJvcihmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCBoZWFkZXIsIGNvbmZpZykge30pO1xuICAgICAgICAvLyBwcm9kdWN0cyA9IGRhdGE7XG4gICAgfTtcbiAgICBmYWN0b3J5LmFkZFByb2R1Y3QgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAkaHR0cCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2Jvb2tzL3YxL3ZvbHVtZXM/cT1zdGFyJyxcbiAgICAgICAgICAgIGRhdGE6IGl0ZW0sXG4gICAgICAgICAgICBjb25maWc6ICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb247J1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9wcm9kdWN0cy5wdXNoKGl0ZW0pO1xuICAgICAgICBjb25zb2xlLmxvZygncHJvZHVjdHMnLCBwcm9kdWN0cyk7XG4gICAgfTtcbiAgICBmYWN0b3J5LmZpbmRQcm9kdWN0QnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB2YXIgZm91bmQgPSB2b2lkIDA7XG4gICAgICAgIHByb2R1Y3RzLmZvckVhY2goZnVuY3Rpb24gKHByb2R1Y3QpIHtcbiAgICAgICAgICAgIGlmIChwcm9kdWN0LmlkID09IGlkKSB7XG4gICAgICAgICAgICAgICAgZm91bmQgPSBwcm9kdWN0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH07XG4gICAgcmV0dXJuIGZhY3Rvcnk7XG59XSk7XG5cbnNob3BBcHAuZmFjdG9yeShcIm9yZGVyc0ZhY3RvcnlcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcmRlcnMgPSBbe1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6IFwiQ2F0IGluIHRoZSBkYXJrXCIsXG4gICAgICAgIGltZzogJy4vaW1nL2NhdDIuanBnJyxcbiAgICAgICAgZGVzYzogXCJJdHMganVzdCBtZVwiLFxuICAgICAgICBxdWFudGl0eTogMVxuICAgIH1dO1xuICAgIHZhciBmYWN0b3J5ID0ge307XG4gICAgZmFjdG9yeS5nZXRPcmRlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvcmRlcnM7XG4gICAgfTtcblxuICAgIGZhY3RvcnkuYWRkT3JkZXIgPSBmdW5jdGlvbiAoaXRlbSkge1xuXG4gICAgICAgIGlmIChvcmRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIGlzQ29pbmNpZGVuY2UgPSBmYWxzZTtcbiAgICAgICAgICAgIG9yZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChvcmRlcikge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLnRpdGxlID09PSBvcmRlci50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBpc0NvaW5jaWRlbmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXIucXVhbnRpdHkrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghaXNDb2luY2lkZW5jZSkge1xuICAgICAgICAgICAgICAgIG9yZGVycy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBmYWN0b3J5O1xufSk7XG5cbi8vIENPTlRST0xMRVJTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBob21lIHBhZ2UgY29udHJvbGxlclxuc2hvcEFwcC5jb250cm9sbGVyKFwibWFpbkNvbnRyb2xsZXJcIiwgW1wiJHNjb3BlXCIsIFwiJGxvY2F0aW9uXCIsIFwiJHJvdXRlUGFyYW1zXCIsIFwicHJvZHVjdHNGYWN0b3J5XCIsIFwib3JkZXJzRmFjdG9yeVwiLCBmdW5jdGlvbiAoJHNjb3BlLCAkbG9jYXRpb24sICRyb3V0ZVBhcmFtcywgcHJvZHVjdHNGYWN0b3J5LCBvcmRlcnNGYWN0b3J5KSB7XG4gICAgJHNjb3BlLnBhZ2VTdHlsZSA9ICdtYWluUGFnZVN0eWxlJztcbiAgICAkc2NvcGUucGFnZUNsYXNzID0gXCJwYWdlLXN0eWxlXCI7XG4gICAgJHNjb3BlLnByb2R1Y3RzID0gW107XG4gICAgJHNjb3BlLm9yZGVycyA9IFtdO1xuICAgICRzY29wZS5pdGVtID0ge307XG5cbiAgICB2YXIgY3JlYXRlTGlzdCA9IGZ1bmN0aW9uIGNyZWF0ZUxpc3QoKSB7XG4gICAgICAgIHByb2R1Y3RzRmFjdG9yeS5nZXRKU09OKCkudGhlbihmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgICAgICBpdGVtcy5kYXRhLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0SXRlbSA9IHt9O1xuXG4gICAgICAgICAgICAgICAgLy9saXN0SXRlbS5kZXNjID0ga2V5LnNlYXJjaEluZm8udGV4dFNuaXBwZXQgPyBrZXkuc2VhcmNoSW5mby50ZXh0U25pcHBldCAgOiBrZXkudm9sdW1lSW5mby5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBsaXN0SXRlbS50aXRsZSA9IGtleS52b2x1bWVJbmZvLnRpdGxlO1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtLmltZyA9IGtleS52b2x1bWVJbmZvLmltYWdlTGlua3MudGh1bWJuYWlsO1xuICAgICAgICAgICAgICAgIC8vICAgIGxpc3RJdGVtLmF1dGhvciA9IGtleS52b2x1bWVJbmZvLmF1dGhvcnNbMF0gPyBrZXkudm9sdW1lSW5mby5hdXRob3JzWzBdICA6ICcnO1xuICAgICAgICAgICAgICAgIC8vIGxpc3RJdGVtLmNhdGVnb3J5ID0gKCFrZXkudm9sdW1lSW5mby5jYXRlZ29yaWVzWzBdKSA/ICAnJyAgOiBrZXkudm9sdW1lSW5mby5jYXRlZ29yaWVzWzBdO1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtLmlkID0ga2V5LmlkO1xuICAgICAgICAgICAgICAgIGxpc3QucHVzaChsaXN0SXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByb2R1Y3RzRmFjdG9yeS5zZXRQcm9kdWN0cyhsaXN0KTtcbiAgICAgICAgICAgICRzY29wZS5wcm9kdWN0cyA9IHByb2R1Y3RzRmFjdG9yeS5nZXRQcm9kdWN0cygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2l0ZW1zLmRhdGEuaXRlbXMnLCBpdGVtcy5kYXRhLml0ZW1zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgJHNjb3BlLnByb2R1Y3RzID0gY3JlYXRlTGlzdCgpO1xuICAgICAgICAkc2NvcGUub3JkZXJzID0gb3JkZXJzRmFjdG9yeS5nZXRPcmRlcnMoKTtcbiAgICB9O1xuXG4gICAgaW5pdCgpO1xufV0pO1xuXG5zaG9wQXBwLmNvbnRyb2xsZXIoXCJTaG93UHJvZHVjdFwiLCBbXCIkc2NvcGVcIiwgXCIkcm91dGVQYXJhbXNcIiwgXCJwcm9kdWN0c0ZhY3RvcnlcIiwgXCJvcmRlcnNGYWN0b3J5XCIsIGZ1bmN0aW9uICgkc2NvcGUsICRyb3V0ZVBhcmFtcywgcHJvZHVjdHNGYWN0b3J5LCBvcmRlcnNGYWN0b3J5KSB7XG4gICAgJHNjb3BlLnBhZ2VTdHlsZSA9ICdzaG93UHJvZHVjdFN0eWxlJztcbiAgICAkc2NvcGUuUHJvZHVjdElkID0gJHJvdXRlUGFyYW1zLmlkO1xuICAgIHZhciBjdXJyZW50UHJvZHVjdCA9IHByb2R1Y3RzRmFjdG9yeS5maW5kUHJvZHVjdEJ5SWQoJHNjb3BlLlByb2R1Y3RJZCk7XG4gICAgJHNjb3BlLmltZyA9IGN1cnJlbnRQcm9kdWN0LmltZztcbiAgICAkc2NvcGUudGl0bGUgPSBjdXJyZW50UHJvZHVjdC50aXRsZTtcbiAgICAkc2NvcGUuZGVzYyA9IGN1cnJlbnRQcm9kdWN0LmRlc2M7XG4gICAgJHNjb3BlLmF1dGhvciA9IGN1cnJlbnRQcm9kdWN0LmF1dGhvcjtcbiAgICAkc2NvcGUuYWRkT3JkZXIgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBvcmRlcnNGYWN0b3J5LmFkZE9yZGVyKHtcbiAgICAgICAgICAgIHRpdGxlOiBjdXJyZW50UHJvZHVjdC50aXRsZSxcbiAgICAgICAgICAgIGlkOiBvcmRlcnNGYWN0b3J5LmdldE9yZGVycygpLmxlbmd0aCArIDEsXG4gICAgICAgICAgICBxdWFudGl0eTogMVxuICAgICAgICB9KTtcbiAgICB9O1xufV0pO1xuXG5zaG9wQXBwLmNvbnRyb2xsZXIoXCJTaG93T3JkZXJzXCIsIFtcIiRzY29wZVwiLCBcIiRyb3V0ZVBhcmFtc1wiLCBcInByb2R1Y3RzRmFjdG9yeVwiLCBcIm9yZGVyc0ZhY3RvcnlcIiwgZnVuY3Rpb24gKCRzY29wZSwgJHJvdXRlUGFyYW1zLCBwcm9kdWN0c0ZhY3RvcnksIG9yZGVyc0ZhY3RvcnkpIHtcbiAgICAkc2NvcGUucGFnZVN0eWxlID0gJ3Nob3dPcmRlcnNTdHlsZSc7XG4gICAgJHNjb3BlLm9yZGVycyA9IFtdO1xuICAgICRzY29wZS5pdGVtID0ge307XG4gICAgJHNjb3BlLnNlbGVjdGVkID0geyB2YWx1ZTogMCB9O1xuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgJHNjb3BlLm9yZGVycyA9IG9yZGVyc0ZhY3RvcnkuZ2V0T3JkZXJzKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCcgJHNjb3BlLm9yZGVycycsICRzY29wZS5vcmRlcnMpO1xuICAgIH07XG5cbiAgICBpbml0KCk7XG4gICAgJHNjb3BlLnJlbW92ZU9yZGVyID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKCRzY29wZS5vcmRlcnNbaXRlbV0ucXVhbnRpdHkgPiAxKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUub3JkZXJzW2l0ZW1dLnF1YW50aXR5KTtcbiAgICAgICAgICAgICRzY29wZS5vcmRlcnNbaXRlbV0ucXVhbnRpdHkgLT0gMTtcbiAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUub3JkZXJzW2l0ZW1dLnF1YW50aXR5ID09PSAxKSB7XG4gICAgICAgICAgICAkc2NvcGUub3JkZXJzLnNwbGljZShpdGVtLCAxKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpdGVtJywgaXRlbSk7XG4gICAgICAgIH1cbiAgICB9O1xufV0pO1xuXG5zaG9wQXBwLmNvbnRyb2xsZXIoXCJhZGRQcm9kdWN0XCIsIFtcIiRzY29wZVwiLCBcInByb2R1Y3RzRmFjdG9yeVwiLCBmdW5jdGlvbiAoJHNjb3BlLCBwcm9kdWN0c0ZhY3RvcnkpIHtcbiAgICAkc2NvcGUucGFnZVN0eWxlID0gJ2FkZFN0eWxlJztcblxuICAgICRzY29wZS5hZGRQcm9kdWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBwcm9kdWN0c0ZhY3RvcnkuYWRkUHJvZHVjdCh7XG4gICAgICAgICAgICB0aXRsZTogJHNjb3BlLm5ld1Byb2R1Y3QudGl0bGUsXG4gICAgICAgICAgICBpbWc6ICRzY29wZS5uZXdQcm9kdWN0LmltZyxcbiAgICAgICAgICAgIGRlc2M6ICRzY29wZS5uZXdQcm9kdWN0LmRlc2MsXG4gICAgICAgICAgICBpZDogTWF0aC5yYW5kb20oKVxuICAgICAgICB9KTtcbiAgICB9O1xufV0pOyJdLCJmaWxlIjoiYXBwLmpzIn0=
