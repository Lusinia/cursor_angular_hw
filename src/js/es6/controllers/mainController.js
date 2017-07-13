(function () {

    // CONTROLLERS ============================================
// home page controller
    shopApp.controller("mainController",
        ["$scope", "$location", "$routeParams", "productsFactory", "ordersFactory", ($scope, $location, $routeParams, productsFactory, ordersFactory) => {
            $scope.pageStyle = 'mainPageStyle';
            $scope.pageClass = "page-style";
            $scope.products = [];
            $scope.orders = [];
            $scope.item = {};
            $scope.genreList =[];
            $scope.filters = '';
            let createList = () => {
                productsFactory.getJSON().then((items) => {
                    let list = [];
                    items.data.forEach((key) => {
                        let listItem = {};
                        listItem.description = key.description;
                        listItem.title = key.title;
                        listItem.img = key.img;
                        listItem.genre = key.genre;
                        listItem.cost = +key.cost;
                        listItem.id = key.id;
                        list.push(listItem);
                    });
                    productsFactory.setProducts(list);
                    $scope.products = list;

                    var genreList = _.map(list, 'genre');
                    $scope.genreList = _.uniq(genreList);

                    $scope.myFilter=(link) => {
                        if(link == null) {
                            $scope.filters = '';
                        } else {
                            $scope.filters = link;
                        }
                    }

                });
            };
        var init = () => {
                $scope.products = createList();
                $scope.orders = ordersFactory.getOrders();
            };

            init();

        }
        ]);
}());