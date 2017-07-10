

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

        .otherwise({redirectTo: "/"});
    // $locationProvider.html5Mode(true);
}]);

// FACTORY
shopApp.factory("productsFactory", ["$http", ($http) => {

    let recieveData = () => {
        return $http.get('http://localhost:8080/')
    };
    var products = [];
    console.log('products', products);

    let factory = {};
    factory.getJSON = () => {
        return recieveData();
    }
    factory.getProducts = () => {
        console.log('products', products);

        return products;
    };
    factory.setProducts = (data) => {
        $http.post('http://localhost:8080/', data)
            .success(function (data, status, headers, config) {
            })
            .error(function (data, status, header, config) {
            });
        // products = data;

    };
    factory.addProduct = (item) => {
        $http({
            method: 'post',
            url:'https://www.googleapis.com/books/v1/volumes?q=star',
            data: item,
            config: 'Content-Type: application/json;'
        }).then(function (response) {
            console.log(response);
        }, function (response) {
            console.log(response);
        });

        //products.push(item);
        console.log('products', products);

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
    let orders = [ {
        id: 1,
        title: "Cat in the dark",
        img: './img/cat2.jpg',
        desc: "Its just me",
        quantity: 1
    }
    ];
    let factory = {};
    factory.getOrders = () => {
        return  orders;
    };

    factory.addOrder = (item) => {

        if(orders.length >0){
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
                items.data.items.forEach((key) => {
                    let listItem = {};

                    //listItem.desc = key.searchInfo.textSnippet ? key.searchInfo.textSnippet  : key.volumeInfo.description;
                    listItem.title = key.volumeInfo.title;
                    listItem.img = key.volumeInfo.imageLinks.thumbnail;
                //    listItem.author = key.volumeInfo.authors[0] ? key.volumeInfo.authors[0]  : '';
                 // listItem.category = (!key.volumeInfo.categories[0]) ?  ''  : key.volumeInfo.categories[0];
                    listItem.id = key.id;
                    list.push(listItem);
                });
                productsFactory.setProducts(list);
                $scope.products = productsFactory.getProducts();
                console.log('items.data.items', items.data.items);

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
            if( $scope.orders[item].quantity > 1){
                console.log($scope.orders[item].quantity)
                $scope.orders[item].quantity -=1 ;
            } else if ($scope.orders[item].quantity  === 1) {
                $scope.orders.splice(item, 1);
                console.log('item',item);
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
                    desc: $scope.newProduct.desc,
                    id: Math.random()
                }
            );

        };

    }
    ]);