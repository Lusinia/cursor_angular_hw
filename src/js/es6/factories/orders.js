(function () {
    shopApp.factory("ordersFactory", ["$location", "$http", ($location, $http) => {
        let API = 'http://localhost:8080';
        var orders = [];

        let factory = {};
        factory.getOrders = () => {
            return orders;
        };
        factory.setOrderToRemote = (data, success, error) => {
            $http.post(API + '/me/orders' , data).success(success).error(error);
            orders = [];
        };

        factory.addOrder = (item) => {
             if (orders.length >= 0) {
                var isCoincidence = false;
                 orders.forEach((order) => {
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
        factory.defineCostForItems = (orders) =>  orders.reduce((curr, all) =>  { return +curr + +all.cost }, 0);
        return factory;
    }]);

}())