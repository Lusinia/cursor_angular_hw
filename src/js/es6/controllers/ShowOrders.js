(function () {
    shopApp.controller("ShowOrders",
        ["$scope", "$stateParams", "productsFactory", "ordersFactory", ($scope, $stateParams, productsFactory, ordersFactory) => {
            $scope.pageStyle = 'showOrdersStyle';
            $scope.orders = [];
            $scope.sum = ordersFactory.defineCostForItems(ordersFactory.getOrders());
            $scope.item = {};
            $scope.selected = {value: 0};

            let init = () => {
                $scope.orders = ordersFactory.getOrders();
            };

            init();
            $scope.sendOrder = (data) => {
                var req = data.map((item) => {
                    var newItem = {
                        "cost": item.cost,
                        "desc": item.desc,
                        "title": item.title,
                        "img": item.img,
                        "id": item.id,
                        "quantity": item.quantity
                    };

                    return newItem
                });


                ordersFactory.setOrderToRemote(JSON.stringify(req), (res) => {
                    console.log('res ', res);
                }, (err) => {
                    console.log('err ', err);
                });
                $scope.orders = [];
            };
            $scope.removeOrder = (item) => {
                if ($scope.orders[item].quantity > 1) {
                    $scope.orders[item].quantity -= 1;
                } else if ($scope.orders[item].quantity === 1) {
                    $scope.orders.splice(item, 1);
                }

            };
        }
        ]);

}());