'use strict';

/**
 * Created by alenka on 21.07.17.
 */
(function () {
    shopApp.factory('httpRequestInterceptor', ["$localStorage", function ($localStorage) {
        // Auto sending request headers for auth
        return {
            request: function request(config) {

                config.headers['Authorization'] = 'JWT ' + $localStorage.token;
                config.headers['Accept'] = 'application/json; odata=verbose';

                return config;
            }
        };
    }]);
})();