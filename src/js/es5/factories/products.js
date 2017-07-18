"use strict";

(function () {
    // FACTORY
    shopApp.factory("productsFactory", ["$http", "$location", "$timeout", function ($http, $location, $timeout) {
        var API = 'http://localhost:8080/';
        var recieveData = function recieveData() {
            return $http.get(API);
        };
        var products = [];

        var factory = {};
        factory.getJSON = function () {
            return recieveData();
        };
        factory.getProducts = function () {
            return products;
        };
        factory.setProducts = function (data) {
            products = data;
        };
        factory.addProduct = function (item) {
            $http({
                method: 'post',
                url: API,
                data: JSON.stringify(item),
                config: 'Content-Type: application/json;'
            }).then(function (response) {
                console.log(response);
                $timeout(function () {
                    $location.path('/');
                }, 1000);
            }, function (response) {
                console.log(response);
            });
        };
        factory.deleteProduct = function (data) {

            var productInfo = {
                index: data.index,
                productId: data.product.id
            };
            $http.delete(API + 'product/' + productInfo.productId, { params: productInfo }).then(function (data) {
                $timeout(function () {
                    $location.path('/');
                }, 1000);

                console.log(data);
            });
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
})();