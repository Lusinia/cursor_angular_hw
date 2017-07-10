
(function() {
    shopApp.controller("addProduct",
        ["$scope", "productsFactory", ($scope, productsFactory) => {
            $scope.pageStyle = 'addStyle';

            $scope.addProduct = () => {
                productsFactory.addProduct(
                    {
                        title: $scope.newProduct.title,
                        img: $scope.newProduct.img,
                        desc: $scope.newProduct.desc,
                        id: Math.random()
                    }
                );

            };

        }
        ])
}());