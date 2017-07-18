"use strict";

(function () {
    shopApp.factory("ordersFactory", ["$location", function ($location) {
        var orders = [{
            id: 1,
            title: "Cat in the dark",
            img: './img/cat2.jpg',
            desc: "Its just me",
            cost: '50',
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
            $location.path('/');
        };
        factory.defineCostForItems = function (orders) {
            orders.reduce(orders, function (curr, all) {
                all += curr.cost;
            }, 0);
        };
        return factory;
    }]);
})();