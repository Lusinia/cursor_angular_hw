// define our application and pull in ngRoute and ngAnimate
let shopApp = angular.module("shopApp", ["ngRoute", "ngAnimate"]);
//
// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
shopApp.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {

    $routeProvider

    // home page
        .when("/", {
            templateUrl: "../partials/home.html",
            controller: "mainController"
        })

        // add page
        .when("/add", {
            templateUrl: "../partials/add.html",
            controller: "addProduct"
        })

        // orders page
        .when("/orders", {
            templateUrl: "../partials/orders.html",
            controller: "ShowOrders"
        })

        // product page
        .when("/product/:id", {
            templateUrl: "../partials/product.html",
            controller: "ShowProduct"
        })

        .otherwise({redirectTo: "/orders"});
    // $locationProvider.html5Mode(true);
}]);

// FACTORY
shopApp.factory("productsFactory", ["$http", ($http) => {

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

shopApp.factory("ordersFactory", () => {
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

    };
    factory.defineCostForItems = (orders) => {
        var sum = 0;
        orders.forEach((order) => {
            sum += +order.cost;
        });
        return sum
    };
    return factory;
});

// CONTROLLERS ============================================
// home page controller
shopApp.controller("mainController",
    ["$scope", "$location", "$routeParams", "productsFactory", "ordersFactory", ($scope, $location, $routeParams, productsFactory, ordersFactory) => {
        $scope.pageStyle = 'mainPageStyle';
        $scope.pageClass = "page-style";
        $scope.products = [];
        $scope.orders = [];
        $scope.item = {};

        let createList = () => {
            productsFactory.getJSON().then((items) => {
                let list = [];
                items.data.forEach((key) => {
                    let listItem = {};
                    listItem.description = key.description;
                    listItem.title = key.title;
                    listItem.img = key.img;
                    listItem.genre = key.genre;
                    listItem.cost = key.cost;
                    listItem.id = key.id;
                    list.push(listItem);
                });
                productsFactory.setProducts(list);
                $scope.products = list;
                console.log('productsFactory.getJSON()', productsFactory.getJSON());

            });
        }


        var init = () => {
            $scope.products = createList();
            $scope.orders = ordersFactory.getOrders();
        };

        init();

    }
    ]);
shopApp.controller("ShowProduct",
    ["$scope", "$routeParams", "productsFactory", "ordersFactory", ($scope, $routeParams, productsFactory, ordersFactory) => {
        $scope.pageStyle = 'showProductStyle';
        $scope.ProductId = $routeParams.id;
        let currentProduct = productsFactory.findProductById($scope.ProductId);
        $scope.img = currentProduct.img;
        $scope.title = currentProduct.title;
        $scope.genre = currentProduct.genre;
        $scope.description = currentProduct.description;
        $scope.cost = currentProduct.cost;

        $scope.products = productsFactory.getProducts();
         // console.log('currentProduct', currentProduct);

        $scope.addOrder = (item) => {
            ordersFactory.addOrder({
                title: currentProduct.title,
                id: ordersFactory.getOrders().length + 1,
                cost:  currentProduct.cost,
                quantity: 1
            });

        };
        $scope.deleteProduct = () => {

            var index = $scope.products.indexOf(currentProduct);
            productsFactory.deleteProduct({
                index: index,
                product: currentProduct
            });
            // $scope.products.splice(index, 1);
            // console.log('index', index);
            // console.log('products', products);

        }


    }
    ]);

shopApp.controller("ShowOrders",
    ["$scope", "$routeParams", "productsFactory", "ordersFactory", ($scope, $routeParams, productsFactory, ordersFactory) => {
        $scope.pageStyle = 'showOrdersStyle';
        $scope.orders = [];
        $scope.sum = ordersFactory.defineCostForItems(ordersFactory.getOrders());
        $scope.item = {};
        $scope.selected = {value: 0};
        console.log('$scope.sum',$scope.sum);

        let init = () => {
            $scope.orders = ordersFactory.getOrders();
            console.log(' $scope.orders', $scope.orders);
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


shopApp.controller("addProduct",
    ["$scope", "productsFactory", ($scope, productsFactory) => {
        $scope.pageStyle = 'addStyle';

        $scope.addProduct = () => {
            productsFactory.addProduct(
                {
                    title: $scope.newProduct.title,
                    img: $scope.newProduct.img,
                    description: $scope.newProduct.desc,
                    genre: $scope.newProduct.genre,
                    cost: $scope.newProduct.cost,
                    id: Math.random()
                }
            );

        };

    }
    ]);