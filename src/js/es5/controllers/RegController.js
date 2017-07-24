"use strict";

/**
 * Created by alenka on 19.07.17.
 */
/**
 * Created by alenka on 18.07.17.
 */
(function () {

    // CONTROLLERS ============================================
    // home page controller
    shopApp.controller("RegController", ["$scope", "$localStorage", "$location", "usersFactory", "$timeout", function ($scope, $localStorage, $location, usersFactory, $timeout) {

        $scope.registered = function () {
            // Grab data from form
            var formData = {
                username: $scope.username,
                email: $scope.email,
                password: $scope.password
            };
            // Send data to factory to post it and handle result
            usersFactory.register(formData, function (res) {
                if (res.type == false) {
                    console.log(res);
                } else {
                    $localStorage.token = res.token;
                    $localStorage.isAuthed = true;
                    $localStorage.username = res.username;

                    $timeout(function () {
                        $location.path('/');
                        // window.location.href = '/';
                    }, 2000);
                }
            }, function () {
                return console.log('Error register');
            });
            console.log('$localStorage.', $localStorage);
        };
    }]);
})();