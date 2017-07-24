"use strict";

/**
 * Created by alenka on 18.07.17.
 */
(function () {

    // CONTROLLERS ============================================
    // home page controller
    shopApp.controller("AuthController", ["$scope", "$localStorage", "$location", "usersFactory", "$timeout", "ordersFactory", function ($scope, $localStorage, $location, usersFactory, $timeout, ordersFactory) {
        $scope.user = '';
        $scope.isAdmin = '';
        var formData = {
            login: '',
            password: ''
        };
        var init = function init() {
            // Look at localStorage to know status of auth
            $scope.isAuthed = function () {
                if ($localStorage.token || $localStorage.isAuth) {
                    return true;
                } else {
                    return false;
                }
            };
            $scope.orders = ordersFactory.getOrders();
            $scope.defaultUserName = $localStorage.username;
            $scope.isAdmin = function () {
                return $localStorage.isAdmin;
            }; // && $localStorage.isAuth;
        };
        init();

        console.log(' $scope.isAuthed ', $scope.isAuthed());
        console.log('$scope.isAdmin ', $scope.isAdmin);
        var getUser = function getUser() {
            // Grab data of user from res
            usersFactory.getUser(function (data) {
                if (data.type == false) {

                    console.log(data.data);
                } else {
                    $scope.user = data;
                    $localStorage.username = data.username;
                    $scope.defaultUserName = data.username;
                    $localStorage.isAdmin = data.isAdmin;
                    console.log('$scope.user', $scope.user);
                }
            }, function (err) {
                console.log(err);
            });
        };
        // After pushing Login
        $scope.loginUser = function () {
            // Grab data from form
            formData = {
                login: $scope.login,
                password: $scope.password
            };
            // Transfer data to factory for posting and handle res
            usersFactory.login(formData, function (res) {

                if (res.type == false) {
                    $scope.login = '';
                    $scope.password = '';
                    console.log(res.message);
                } else {
                    console.log('res', res);
                    $localStorage.token = res.token;
                    $localStorage.isAuthed = true;

                    console.log(' $localStorage.username ', $localStorage.username);
                    console.log(' $scope.defaultUserName ', $scope.defaultUserName);
                    $scope.login = '';
                    $scope.password = '';

                    getUser();
                }
            }, function () {
                console.log('Error login');
            });

            $timeout(function () {
                window.href = '/';
            }, 3000);
        };

        $scope.logout = function () {
            usersFactory.logout(function () {
                console.log('your is logged out');
                // Clear localStorage
                $localStorage.isAuthed = false;
                $localStorage.isAdmin = false;
                delete $localStorage.username;
                $timeout(function () {
                    $location.path('/');
                    // window.location.href = '/';
                }, 2000);
            }, function () {
                console.log("Failed to logout!");
            });
        };
        $scope.register = function () {
            $location.path('/register');
        };
    }]);
})();