/**
 * Created by alenka on 18.07.17.
 */
(function () {
    shopApp.factory("usersFactory",["$location", "$http", ($location, $http) => {
        let API = 'http://localhost:8080/';
        let users =  () => {
            return $http.get(API + '/auth/quote')
        };

        let factory = {};
        factory.getUsers = () => users;

        factory.register = function() {
            return $http.post(API + '/auth/register', {
                username: username,
                password: password
            })
        };
        factory.login = function(username, password) {
            return $http.post(API + '/auth/login', {
                username: username,
                password: password
            })
        };
        return factory;
    }]);

}())