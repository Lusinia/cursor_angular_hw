(function() {
    // FACTORY
    shopApp.factory("productsFactory", ["$http", "$location", "$timeout", ($http, $location, $timeout) => {

        let recieveData = () => {
            return $http.get('http://localhost:8080/')
        };
        var products = [];

        let factory = {};
        factory.getJSON = () => {
            return recieveData();
        }
        factory.getProducts = () => {
            return products;
        };
        factory.setProducts = (data) => {
            products = data;

        };
        factory.addProduct = (item) => {
            $http({
                method: 'post',
                url: 'http://localhost:8080/',
                data: JSON.stringify(item),
                config: 'Content-Type: application/json;'
            }).then(function (response) {
                console.log(response);
                $timeout(()=> {
                    $location.path('/');

                },1000)
            }, function (response) {
                console.log(response);
            });


        };
        factory.deleteProduct = (data) => {

            var productInfo = {
                index: data.index,
                productId: data.product.id
            }
            $http.delete('http://localhost:8080/product/' + productInfo.productId, {params: productInfo}).then((data) => {
                $timeout(()=> {
                    $location.path('/');
                }, 1000)

                console.log(data)
            })
        };

        factory.findProductById = (id) => {
            let found;
            products.forEach((product) => {
                if (product.id == id) {
                    found = product;
                }
            });
            return found;
        };
        return factory;
    }
    ]);

}());
