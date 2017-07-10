(function() {
    shopApp.controller("ShowProduct",
        ["$scope", "$routeParams", "productsFactory", "ordersFactory", ($scope, $routeParams, productsFactory, ordersFactory) => {
            $scope.pageStyle = 'showProductStyle';
            $scope.ProductId = $routeParams.id;
            let currentProduct = productsFactory.findProductById($scope.ProductId);
            $scope.img = currentProduct.img;
            $scope.title = currentProduct.title;
            $scope.desc = currentProduct.desc;
            $scope.author = currentProduct.author;
            $scope.addOrder = (item) => {
                ordersFactory.addOrder({
                    title: currentProduct.title,
                    id: ordersFactory.getOrders().length + 1,
                    quantity: 1
                });

            };


        }
        ]);
}());