/**
 * Created by alenka on 19.07.17.
 */
/**
 * Created by alenka on 18.07.17.
 */
(function () {

    // CONTROLLERS ============================================
// home page controller
    shopApp.controller("RegController",
        ["$scope", "$localStorage",  "$location",  "usersFactory", "$timeout", ($scope, $localStorage, $location, usersFactory, $timeout ) => {

            $scope.registered = function() {
                // Grab data from form
                let formData = {
                    username: $scope.username,
                    email: $scope.email,
                    password: $scope.password
                };
                // Send data to factory to post it and handle result
                usersFactory.register(formData,  (res) => {
                    if (res.type == false) {
                        console.log(res);
                    } else {
                        $localStorage.token = res.token;
                        $localStorage.isAuthed = true;
                        $localStorage.username = res.username;

                        $timeout(() => {
                            $location.path('/');
                           // window.location.href = '/';
                        }, 2000)

                    }
                }, () => console.log('Error register'));
                console.log('$localStorage.', $localStorage)

            }

        }
        ]);
}());