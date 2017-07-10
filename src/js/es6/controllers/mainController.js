(function() {

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
}());