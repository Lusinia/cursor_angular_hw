"use strict";

(function () {
    shopApp.controller("ShowOrders", ["$scope", "$stateParams", "productsFactory", "ordersFactory", function ($scope, $stateParams, productsFactory, ordersFactory) {
        $scope.pageStyle = 'showOrdersStyle';
        $scope.orders = [];
        $scope.sum = ordersFactory.defineCostForItems(ordersFactory.getOrders());
        $scope.item = {};
        $scope.selected = { value: 0 };

        var init = function init() {
            $scope.orders = ordersFactory.getOrders();
        };

        init();
        $scope.sendOrder = function (data) {
            var req = data.map(function (item) {
                var newItem = {
                    "cost": item.cost,
                    "desc": item.desc,
                    "title": item.title,
                    "img": item.img,
                    "id": item.id,
                    "quantity": item.quantity
                };

                return newItem;
            });

            ordersFactory.setOrderToRemote(JSON.stringify(req), function (res) {
                console.log('res ', res);
            }, function (err) {
                console.log('err ', err);
            });
            $scope.orders = [];
        };
        $scope.removeOrder = function (item) {
            if ($scope.orders[item].quantity > 1) {
                $scope.orders[item].quantity -= 1;
            } else if ($scope.orders[item].quantity === 1) {
                $scope.orders.splice(item, 1);
            }
        };
    }]);
})();