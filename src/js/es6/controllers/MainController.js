(function () {

    // CONTROLLERS ============================================
// home page controller
    shopApp.controller("MainController",
        ["$scope", "usersFactory", "productsFactory", "ordersFactory", "$localStorage", ($scope, usersFactory,   productsFactory, ordersFactory, $localStorage) => {
            $scope.pageStyle = 'mainPageStyle';
            $scope.pageClass = "page-style";

            $scope.products = [];
            $scope.isLoaded = false;
            $scope.isAuthed = $localStorage.isAuthed;

            $scope.genreList = [];
            $scope.filters = '';
            $scope.typeOptions = [
                { name: 'Название', value: 'title' },
                { name: 'Жанр', value: 'genre' },
                { name: 'Цена по возрастанию', value: 'cost' }
            ];
            $scope.sortList =  {type : $scope.typeOptions[0].value};
             // Custom filter
            $scope.myFilter = (link) => {
                if (link == null) {
                    $scope.filters = '';
                } else {
                    $scope.filters = link;
                }
            };
            // Get JSON of products from response and work with it
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

                    var genreList = _.map(list, 'genre'); // take only one key from object
                    var genres = count();  // make array form no-repeated genres
                    var genreArrayFromObject = _.map(genres, function (item, i) {  //reconstruct structure for ng-repeat
                        return {
                            num: item,
                            val: i || null
                        };
                    });
                    $scope.genreList = genreArrayFromObject;

                    function count() {
                        genreList.sort();
                        var uniqValuesObjesc = {};
                        var current = null;
                        var cnt = 0;
                        for (var i = 0; i < genreList.length; i++) {
                            if (genreList[i] !== current) {
                                current = genreList[i];
                                cnt = 1;
                                uniqValuesObjesc[current] = cnt;
                            } else {
                                cnt++;
                                uniqValuesObjesc[current] = cnt;
                            }
                        }
                        return uniqValuesObjesc;
                    }

                });
            };


            var init = () => {
                $scope.products = createList();
                $scope.isLoaded = true;

             };

            init();


        }
        ]);
}());