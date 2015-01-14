app.controller('MainCtrl', function ($scope, $location, $http,  $timeout, GetMenuItems){

    $scope.PageTitle = "AXC Launch Pad";

    // Setup Alerts
    $scope.alerts = [];
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

});