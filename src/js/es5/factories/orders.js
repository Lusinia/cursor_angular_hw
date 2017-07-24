"use strict";

(function () {
    shopApp.factory("ordersFactory", ["$location", "$http", function ($location, $http) {
        var API = 'http://localhost:8080';
        var orders = [];

        var factory = {};
        factory.getOrders = function () {
            return orders;
        };
        factory.setOrderToRemote = function (data, success, error) {
            $http.post(API + '/me/orders', data).success(success).error(error);
            orders = [];
        };

        factory.addOrder = function (item) {
            if (orders.length >= 0) {
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
            $location.path('/');
        };
        factory.defineCostForItems = function (orders) {
            return orders.reduce(function (curr, all) {
                return +curr + +all.cost;
            }, 0);
        };
        return factory;
    }]);
})();