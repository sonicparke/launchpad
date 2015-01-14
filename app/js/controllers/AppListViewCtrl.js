app.controller('AppListViewCtrl', function ($scope, $location, $http,  $timeout, GetMenuItems){
    $scope.showLoader = true;
    $scope.GetDataItems = [];

    // Initial Functions
    $scope.InitPage = function() {
        $scope.GetMenuItems({sUserID: 'bmcalister'});
    };


    $scope.GetMenuItems  = function (data) {
        $scope.itemsResults = GetMenuItems.all('GetMenuItems').getList(data);
        return $scope.itemsResults.then(function(data){
            $scope.showLoader = false;
            $scope.MenuItems = data;
        });
    };

});