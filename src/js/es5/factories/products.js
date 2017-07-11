"use strict";

(function () {
    // FACTORY
    shopApp.factory("productsFactory", ["$http", "$location", function ($http, $location) {

        var recieveData = function recieveData() {
            return $http.get('http://localhost:8080/');
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
                url: 'http://localhost:8080/',
                data: JSON.stringify(item),
                config: 'Content-Type: application/json;'
            }).then(function (response) {
                console.log(response);
                $location.path('/');
            }, function (response) {
                console.log(response);
            });
        };
        factory.deleteProduct = function (data) {

            var productInfo = {
                index: data.index,
                productId: data.product.id
            };
            $http.delete('http://localhost:8080/product/' + productInfo.productId, { params: productInfo }).then(function (data) {
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