(function () {
    shopApp.controller("ShowProduct",
        ["$scope", "$stateParams", "$localStorage","productsFactory", "ordersFactory","usersFactory",
            ($scope, $stateParams, $localStorage, productsFactory, ordersFactory, usersFactory) => {
            $scope.pageStyle = 'showProductStyle';
            $scope.ProductId = $stateParams.id;
            let currentProduct = productsFactory.findProductById($scope.ProductId);
            $scope.img = currentProduct.img;
            $scope.title = currentProduct.title;
            $scope.genre = currentProduct.genre;
            $scope.description = currentProduct.description;
            $scope.cost = currentProduct.cost;
            $scope.products = productsFactory.getProducts();
            $scope.isAdmin = $localStorage.isAdmin;
            $scope.isLogin = $localStorage.token;


            $scope.addOrder = (item) => {
                ordersFactory.addOrder({
                    title: currentProduct.title,
                    id: ordersFactory.getOrders().length + 1,
                    cost: currentProduct.cost,
                    quantity: 1
                });
            };

            $scope.addWish = (item) => {
                console.log('item added ', item)

            };

            $scope.deleteProduct = () => {
                console.log(currentProduct)
                var index = $scope.products.indexOf(currentProduct);
                productsFactory.deleteProduct({
                    index: index,
                    product: currentProduct
                });
            }
        }
        ]);
}());