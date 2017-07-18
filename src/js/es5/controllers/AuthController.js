"use strict";

/**
 * Created by alenka on 18.07.17.
 */
(function () {

    // CONTROLLERS ============================================
    // home page controller
    shopApp.controller("AuthController", ["$scope", "usersFactory", "productsFactory", "ordersFactory", function ($scope, usersFactory, productsFactory, ordersFactory) {
        var user = {
            username: $scope.username,
            password: $scope.password
        };

        //Auth

        function handleRequest(res) {
            var token = res.data ? res.data.token : null;
            if (token) {
                console.log('JWT:', token);
            }
            // self.message = res.data.message;
        }
        $scope.login = function (e) {
            // e.preventDefault();
            console.log('user', user);
            // usersFactory.login( user.username,  user.password)
            //    .then(handleRequest, handleRequest)
        };

        $scope.getQuote = function () {
            user.getQuote().then(handleRequest, handleRequest);
        };
        // $scope.logout = function() {
        //     auth.logout && auth.logout()
        // }
        // $scope.isAuthed = function() {
        //     return auth.isAuthed ? auth.isAuthed() : false
        // }


        // var init = () => {
        //     $scope.products = createList();
        //     $scope.orders = ordersFactory.getOrders();
        //     $scope.isLoaded = true;
        // };
        //
        // init();

    }]);
})();