app.controller('LoginViewCtrl', function ($scope, $location, $q, $http,  $timeout){

    // Initial Functions
    $scope.InitPage = function() {
        console.log('login works');
    };

    $scope.SignIn =  function(username, password) {
        console.log('$scope.login :', $scope.login);
        $http.post('login', {username: username, password: password}).then(function(response){
            if(response.data.success){
                console.log('logged in');
            } else {
                console.log('log in failed.');
            }
        });
    };

// $scope.SignIn =  function() {
//     var dfd = $q.defer();
//       $http.post('/login', {username:$scope.login.username, password:$scope.login.password}).then(function(response) {
//         if(response.data.success) {
//           var user = new mvUser();
//           angular.extend(user, response.data.user);
//           dfd.resolve(true);
//         } else {
//           dfd.resolve(false);
//         }
//       });
//       return dfd.promise;
// };



});