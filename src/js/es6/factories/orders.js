(function () {
    shopApp.factory("ordersFactory",["$location", ($location) => {
        let orders = [{
            id: 1,
            title: "Cat in the dark",
            img: './img/cat2.jpg',
            desc: "Its just me",
            cost: '50',
            quantity: 1
        }
        ];
        let factory = {};
        factory.getOrders = () => {
            return orders;
        };

        factory.addOrder = (item) => {

            if (orders.length > 0) {
                let isCoincidence = false;
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
        factory.defineCostForItems = (orders) => {
            var sum = 0;
            orders.forEach((order) => {
                sum += +order.cost;
            });
            return sum
        };
        return factory;
    }]);

}())