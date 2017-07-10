
import shopApp from '../module/module';

// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
export let config =  () => {
    shopApp.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {

        $routeProvider

        // home page
            .when("/", {
                templateUrl: "../partials/home.html",
                controller: "mainController"
            })

            // add page
            .when("/add", {
                templateUrl: "../partials/add.html",
                controller: "addProduct"
            })

            // orders page
            .when("/orders", {
                templateUrl: "../partials/orders.html",
                controller: "ShowOrders"
            })

            // product page
            .when("/product/:id", {
                templateUrl: "../partials/product.html",
                controller: "ShowProduct"
            })

            .otherwise({redirectTo: "/"});
        // $locationProvider.html5Mode(true);
    }]);


}