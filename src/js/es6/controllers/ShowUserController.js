/**
 * Created by alenka on 20.07.17.
 */
/**
 * Created by alenka on 18.07.17.
 */
(function () {

    // CONTROLLERS ============================================
// home page controller
    shopApp.controller("ShowUserController",
        ["$scope", "$localStorage",  "$location",  "usersFactory",  ($scope, $localStorage, $location, usersFactory ) => {
            $scope.isEqualPasswords= true;
            $scope.isEqualPasswordToLast= true;
            $scope.isChanged = true;
            $scope.userData = '';
            //Define user
        var handlerSuccess = (data) => {
            $scope.userData = data;
            console.log('data', data)
            };
        var handlerError = (err) => {
            console.log(err)
        };
        usersFactory.getUser(handlerSuccess, handlerError);

        $scope.logout = () => {
            usersFactory.logout(()=>{
                console.log("You is logged out");
                $location.path('/');
            })
        };
        $scope.saveChanges = (name, oldPassword, newPassword, newPassword2) => {
                $scope.isEqualPasswords =  (newPassword  === newPassword2);
            var data = {
                username: name,
                password: oldPassword,
                newPassword: newPassword2
            };
            console.log('data', data);
            usersFactory.updateData( data , function(res) {
             console.log('res', res);
             if(res.type == 'false'){
                 if(!res.isPasswordEqualToCurrent) {
                     $scope.isEqualPasswordToLast = false;
                 } else if (!res.isPasswordEqualBetween) {
                     $scope.isEqualPasswords = false;
                 }
             }
             else {
                 $scope.isChanged = true;
             }
                    // $location.path('/');
            })
        };


            console.log('$scope.isEqualPasswords ', $scope.isEqualPasswords)
            console.log('$scope.isEqualPasswords ', $scope.isEqualPasswords)

            /*
            toDo
            wishes
            last orders
             lastOrderData
             lastOrdersCount

             */

        }
        ]);
}());