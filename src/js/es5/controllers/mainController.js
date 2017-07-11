"use strict";

(function () {

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
                items.data.forEach(function (key) {
                    var listItem = {};
                    listItem.description = key.description;
                    listItem.title = key.title;
                    listItem.img = key.img;
                    listItem.genre = key.genre;
                    listItem.cost = key.cost;
                    listItem.id = key.id;
                    list.push(listItem);
                });
                productsFactory.setProducts(list);
                $scope.products = list;
            });
        };

        var init = function init() {
            $scope.products = createList();
            $scope.orders = ordersFactory.getOrders();
        };

        init();
    }]);
})();