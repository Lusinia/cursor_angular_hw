(function() {
    shopApp.controller("ShowOrders",
        ["$scope", "$routeParams", "productsFactory", "ordersFactory", ($scope, $routeParams, productsFactory, ordersFactory) => {
            $scope.pageStyle = 'showOrdersStyle';
            $scope.orders = [];
            $scope.item = {};
            $scope.selected = {value: 0};
            let init = () => {
                $scope.orders = ordersFactory.getOrders();
                console.log(' $scope.orders', $scope.orders);
            };

            init();
            $scope.removeOrder = (item) => {
                if ($scope.orders[item].quantity > 1) {
                    console.log($scope.orders[item].quantity)
                    $scope.orders[item].quantity -= 1;
                } else if ($scope.orders[item].quantity === 1) {
                    $scope.orders.splice(item, 1);
                    console.log('item', item);
                }

            };
        }
        ]);
}());