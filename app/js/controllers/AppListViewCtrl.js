app.controller('AppListViewCtrl', function ($scope, $location, $http,  $timeout, AppSecurity){
    $scope.showLoader = true;
    $scope.GetDataItems = [];

    // Initial Functions
    $scope.InitPage = function() {
        //$scope.GetMenuItems({UserName: 'bmcalister'});
    };




    $scope.GetMenuItems  = function (data) {
        $scope.itemsResults = AppSecurity.all('MenuItems').getList(data);
        return $scope.itemsResults.then(function(data){
            $scope.showLoader = false;
            $scope.MenuItems = data;
        });
    };

});