"use strict";

(function () {
    shopApp.controller("addProduct", ["$scope", "productsFactory", function ($scope, productsFactory) {
        $scope.pageStyle = 'addStyle';

        $scope.addProduct = function () {
            $scope.newProduct.title = '';
            $scope.newProduct.img = '';
            $scope.newProduct.desc = '';
            $scope.newProduct.genre = '';
            $scope.newProduct.cost = '';

            productsFactory.addProduct({
                title: $scope.newProduct.title,
                img: $scope.newProduct.img,
                description: $scope.newProduct.desc,
                genre: $scope.newProduct.genre,
                cost: +$scope.newProduct.cost,
                id: Math.random()
            });
        };
    }]);
})();