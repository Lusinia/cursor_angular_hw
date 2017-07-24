/**
 * Created by alenka on 18.07.17.
 */
(function () {
    shopApp.factory("usersFactory", ["$localStorage", "$http", ($localStorage, $http) => {
        let API = 'http://localhost:8080';

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }
        var currentUser = getUserFromToken();
        let user = currentUser;
        console.log('user', user);

        let factory = {};
        factory.getUser = (success, error) => {
            $http.get(API + '/me' ).success(success).error(error);
        };


        factory.register = function(data, success, error) {
              $http.post(API + '/auth/register' , data).success(success).error(error);

        };
        factory.login = function(data, success, error) {
              $http.post(API + '/auth/login', data).success(success).error(error);

        };
        factory.logout = function(success) {
            currentUser  = {};
            delete $localStorage.token;
            delete $localStorage.username;
            delete  $localStorage.isAuth;
            success();
        };
        factory.me = function(success, error) {
              $http.get(API + '/me' ).success(success).error(error);
        };
        factory.addWish = (data, success, error) => {
            $http.post(API + '/me/wishes', data ).success(success).error(error);
        };
        factory.addOrder = (success, error) => {
            $http.post(API + '/me/orders', data ).success(success).error(error);
        };
        factory.updateData = (data, success, error) => {
            $http.post(API + '/me?_method=PUT', data ).success(success).error(error);
        };
        return factory;
    }]);

}())





