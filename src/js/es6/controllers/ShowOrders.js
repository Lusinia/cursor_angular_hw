(function() {
    shopApp.controller("ShowOrders",
        ["$scope", "$routeParams", "productsFactory", "ordersFactory", ($scope, $routeParams, productsFactory, ordersFactory) => {
            $scope.pageStyle = 'showOrdersStyle';
            $scope.orders = [];
            $scope.sum = ordersFactory.defineCostForItems(ordersFactory.getOrders());
            $scope.item = {};
            $scope.selected = {value: 0};

            let init = () => {
                $scope.orders = ordersFactory.getOrders();
            };

            init();
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