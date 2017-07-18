"use strict";

/**
 * Created by alenka on 18.07.17.
 */
(function () {
    shopApp.factory("usersFactory", ["$location", "$http", function ($location, $http) {
        var API = 'http://localhost:8080/';
        var users = function users() {
            return $http.get(API + '/auth/quote');
        };

        var factory = {};
        factory.getUsers = function () {
            return users;
        };

        factory.register = function () {
            return $http.post(API + '/auth/register', {
                username: username,
                password: password
            });
        };
        factory.login = function (username, password) {
            return $http.post(API + '/auth/login', {
                username: username,
                password: password
            });
        };
        return factory;
    }]);
})();