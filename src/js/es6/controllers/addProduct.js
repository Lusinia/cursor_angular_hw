(function () {
    shopApp.controller("addProduct",
        ["$scope", "productsFactory", ($scope, productsFactory) => {
            $scope.pageStyle = 'addStyle';
            $scope.options = [
                "Детективы", "Психология", "Фантастика",
                "Фентези", "Сказки", "Женские романы", "Религия", "Ужасы"];

            $scope.addProduct = () => {

                productsFactory.addProduct(
                    {
                        title: $scope.newProduct.title,
                        img: $scope.newProduct.img,
                        description: $scope.newProduct.desc,
                        genre: $scope.newProduct.genre,
                        cost: +$scope.newProduct.cost,
                        id: Math.random()
                    }
                );

            };

        }
        ]);
}());