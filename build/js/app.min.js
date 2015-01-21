'use strict';

var app = angular.module('LaunchPad', ['restangular', 'ui.bootstrap', 'loader', 'ui.router', 'app.core']);


app.config(['$stateProvider', '$provide', '$httpProvider', '$tooltipProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $provide, $httpProvider, $tooltipProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.html5Mode(true);

  delete $httpProvider.defaults.headers.common['X-Requested-With'];


  $stateProvider
  .state('/', {
      url: '/',
      templateUrl: 'app/partials/appList.html',
      controller: 'AppListViewCtrl'
  });
  // .state('login', {
  //     url: '/login',
  //     templateUrl: 'partials/login.html',
  //     controller: 'LoginViewCtrl'
  // });

  $urlRouterProvider.otherwise('/');
  $tooltipProvider.options( {appendToBody: true} );
}]);

angular.module('app.core', []);


// app.run(['$rootScope', '$state', 'JobInputService', 'AuthService', function ($rootScope, $state, JobInputService, AuthService) {
//     // Run when route changes
//     $rootScope.$on("$stateChangeStart", function(event, curr, prev){
//       var job = JobInputService.CurrentJobData();
//       // Check .state config to determine if authentication is needed
//       // and if so check if User is authenticated
//       if (curr.checkForJob && angular.isUndefined(job)) {
//         // User isn’t authenticated
//         $state.go('/');
//         event.preventDefault();
//       }
//     });
//   }]);
app.controller('AppListViewCtrl', ['$scope', '$location', '$http', '$timeout', 'AppSecurity', function ($scope, $location, $http,  $timeout, AppSecurity){
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

}]);
app.controller('Login', ['DataService', function (DataService){
    var vm = this;
    
    vm.Login = Login;

    // Initial Functions
    //$scope.InitPage = function() {
    //    console.log('login works');
    //};

    function Login() {
        console.log('vm.login :', vm.login);
        return DataService.Login(vm.login).then(function(res){
            vm.currentUser = res;
            console.log('vm.currentUser', vm.currentUser);
        });
    };


}]);
app.controller('MainCtrl', ['$scope', function ($scope){

    $scope.PageTitle = "AXC Launch Pad";

    // Setup Alerts
    $scope.alerts = [];
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

}]);
angular.module("ui.bootstrap.alertInline", []).directive('alertInline', ['$timeout', function ($timeout) {
  return {
    restrict:'EA',
    templateUrl: 'app/partials/InlineAlertTemplate.html',
    transclude:true,
    scope:{
      type:'=',
      close:'&',
      autoclose: '=',
      autoclosetime: '='
    },
    link:function (scope, element, attrs) {
      scope.type = scope.type || 'info';
      if(scope.type === 'error') {
        scope.type = 'danger';
      }

      scope.timedDismiss = function (index) {
          $timeout(function () {
            scope.close();
          }, scope.autoclosetime);
        };

      if(scope.autoclose === true){
        scope.timedDismiss();
      }

      scope.dismiss = function () {
        scope.close();
      };
    }
  };
}]);

// Example DOM Element with View File option:
// <alert ng-repeat="alert in alerts" type="alert.type" autoclose="alert.autoclose" autoclosetime="alert.autoclosetime" close="closeAlert(alerts, $index)">{{alert.msg}}<a ng-show="alert.url.length > 0" class="btn btn-mini btn-primary pull-right" href="{{alert.url}}" target="_blank">View File</a></alert>

// Example DOM Element without View File option:
// <alert ng-repeat="alert in alerts" type="alert.type" autoclose="alert.autoclose" autoclosetime="alert.autoclosetime" close="closeAlert(alerts, $index)">{{alert.msg}}</alert>

// Setup Alerts in controller
// $scope.alerts = [];
// $scope.closeAlert = function (array, index) {
//     $scope.alerts.splice(index, 1);
// };

// Push Alert from controller
// $scope.alerts.push({msg: "Please enter End Date", type:'error', autoclose: true, autoclosetime: 3000});
angular.module("ui.bootstrap.alert", []).directive('alert', ['$timeout', function ($timeout) {
  return {
    restrict:'EA',
    templateUrl: 'app/partials/StandardAlertTemplate.html',
    transclude:true,
    scope:{
      type:'=',
      close:'&',
      autoclose: '=',
      autoclosetime: '='
    },
    link:function (scope, element, attrs) {
      scope.type = scope.type || 'info';
      if(scope.type === 'error') {
        scope.type = 'danger';
      }

      scope.timedDismiss = function (index) {
          $timeout(function () {
            scope.close();
          }, scope.autoclosetime);
        };

      if(scope.autoclose === true){
        scope.timedDismiss();
      }

      scope.dismiss = function () {
        scope.close();
      };
    }
  };
}]);

// Example DOM Element with View File option:
// <alert ng-repeat="alert in alerts" type="alert.type" autoclose="alert.autoclose" autoclosetime="alert.autoclosetime" close="closeAlert(alerts, $index)">{{alert.msg}}<a ng-show="alert.url.length > 0" class="btn btn-mini btn-primary pull-right" href="{{alert.url}}" target="_blank">View File</a></alert>

// Example DOM Element without View File option:
// <alert ng-repeat="alert in alerts" type="alert.type" autoclose="alert.autoclose" autoclosetime="alert.autoclosetime" close="closeAlert(alerts, $index)">{{alert.msg}}</alert>

// Setup Alerts in controller
// $scope.alerts = [];
// $scope.closeAlert = function (array, index) {
//     $scope.alerts.splice(index, 1);
// };

// Push Alert from controller
// $scope.alerts.push({msg: "Please enter End Date", type:'error', autoclose: true, autoclosetime: 3000});
angular.module('loader', [])
    .directive('ngLoader', function () {
        return{
            restrict: 'E,A',
            replace: true,
            template: '<span class="ngLoader" style="font-size: 16px; "><i class="fa fa-spinner fa-spin"></i></span>',
            // template: '<i ng-show="showLoader" class="fa fa-spinner fa-spin"></i>',
            scope: {
                showLoader: '=?'
            },
            link:function (scope, element, attrs) {
                scope.showLoader = true;
            }
        };
    })
    .directive('ngDogLoader', function () {
        return{
            restrict: 'E,A',
            replace: true,
            template: '<div class="row text-center" ><img class="img-rounded" width:400px height:263px src="http://axcapps.harsco.com/cdn/images/puggle.gif" /><h3>Loading... please wait...</h3></div>',
            scope: {}
        };
    });
//////////////////////////////////////////////////////////
//
// AXC WebAPI Server Select Directive
// Requires Angular UI Boostrap http://angular-ui.github.io/bootstrap/
//
//////////////////////////////////////////////////////////
angular.module('serverSelect', []);
app.directive('ngServerSelect', function () {
  var _template = '<div class="server-selector" ng-show="showServerSelect" ng-init="Init()">' +
      '<style>' +
      '.server-selector .nav>li>a { padding: 5px; color: #ddd}' +
      '.server-selector .nav>li>a:hover { background-color: #444}' +
      '.server-selector .nav {padding-top: 0; margin-left: 50px;}' +
      '.server-selector .nav-horizontal>li { float: left; margin-right: 10px;}'+
      '.server-selector {height: 20px; font-size: 10px; margin-top: 0;}' +
      '.server-selector { background: #444;}'+
      '.server-selector .t {margin-right: 0; padding: 5px; font-size: 10px; color: #ddd; line-height: 1em; text-transform: uppercase;}'+
      '.server-selector i { width: 11px;}' +
      '.server-selector .fa-check { color: #00FF52;}' +
      '</style>'+
      '<ul class="nav nav-horizontal pull-right" ng-init="GetServer()">' +
      '<li class="t">Server: </li>' +
      '<li ng-repeat="server in data.Servers" ng-click="SetServer(server)" ng-mouseover="hover = true;" ng-mouseout="hover = false;"><a href=""><i class="fa " ng-class="{\'fa-laptop\': server.DisplayName != selectedServer.DisplayName, \'fa-check\': server.DisplayName == selectedServer.DisplayName}" ></i> {{server.DisplayName}}</a></li>' +
      '<li ng-click="RemoveServer()"><a href=""><i class="fa fa-refresh"></i> Clear Servers</a></li>' +
      '</ul>'+
      '<ul class="nav nav-horizontal pull-right" ng-init="GetAPI()">' +
      '<li class="t">API: </li>' +
      '<li ng-repeat="api in data.API" ng-click="SetAPI(api)"><a href=""><i class="fa " ng-class="{\'fa-database\': api.DisplayName != selectedAPI.DisplayName, \'fa-check\': api.DisplayName == selectedAPI.DisplayName}" ></i> {{api.DisplayName}}</a></li>' +
      '<li ng-click="RemoveAPI()"><a href=""><i class="fa fa-refresh"></i> Clear API</a></li>'+
      '</ul>' +
      '</div>';
  return{
    restrict: 'E,A',
    replace: true,
    controller: ['$scope', 'ServerAPI', 'DBData', function($scope, ServerAPI, DBData){
        var Server;
        var API;

      $scope.showServerSelect = false;

      DBData.GetAllData().then(function(result){
        $scope.data = result.data;
        CheckUser();
      });

      // Get the current user from the asp.net yukiness
      $scope.currentUser = 'bmcalister';

      // Show or hide component based on user
      var CheckUser = function(){
        return _.find($scope.data.Users, function(user){
          if(user.Name === $scope.currentUser){
            $scope.showServerSelect = true;
          } else {
            return;
          }
        });
      };

      $scope.GetServer = function() {
        Server = ServerAPI.GetServer();
        if(!Server) {
          Server = 'axcapps.harsco.com';
          $scope.selectedServer = Server;
          return Server;
        } else {
          $scope.selectedServer = Server;
          return Server.servername;
        }
      };

      $scope.SetServer = function(data) {
        var selectedServer = ServerAPI.SetServer(data);
        $scope.selectedServer = selectedServer;
      };

      $scope.RemoveServer = function(data) {
        var selectedServer = ServerAPI.RemoveServer(data);
        $scope.selectedServer = selectedServer;
      };

      $scope.GetAPI = function() {
        API = ServerAPI.GetAPI();
        if(API === 'Test') {
          $scope.showServerSelect = false;
        }
        if(!API) {
          API = '';
          $scope.selectedAPI = API;
          return API;
        } else {
          $scope.selectedAPI = API;
          return API.name;
        }
      };

      $scope.SetAPI = function(data) {
        var selectedApi = ServerAPI.SetAPI(data);
        $scope.GetAPI();

      };

      $scope.RemoveAPI = function(data) {
        var selectedAPI = ServerAPI.RemoveAPI(data);
        $scope.selectedAPI = selectedAPI;
      };

    }],
    template: _template,
    scope:{},
    link:function (scope, element, attrs) {

    }
  };
});
app.factory('ServerAPI', function() {
  var Server = {};
  var API = {};
  var _SetServer = function(data) {
    localStorage.setItem('AXC_API_Storage.Server', JSON.stringify(data));
    Server = JSON.parse(localStorage.getItem('AXC_API_Storage.Server'));
    return Server;
  };
  var _GetServer = function(data) {
    var testUrl = _.contains(window.location.pathname, 'test');
    if(testUrl === true){
      Server.Name = 'axcapps.harsco.com';
      return Server;
    }
    else if(localStorage.getItem('AXC_API_Storage.Server')){
      Server = JSON.parse(localStorage.getItem('AXC_API_Storage.Server'));
      return Server;
    } else {
      Server.Name = 'axcapps.harsco.com';
      return Server;
    }
  };
  var _RemoveServer = function(data) {
    if(localStorage.getItem('AXC_API_Storage.Server')){
      localStorage.removeItem('AXC_API_Storage.Server');
      Server = JSON.parse(localStorage.getItem('AXC_API_Storage.Server'));
      return;
    } else {
      return;
    }
  };
  var _SetAPI = function(data) {
    localStorage.setItem('AXC_API_Storage.API', JSON.stringify(data));
    API = JSON.parse(localStorage.getItem('AXC_API_Storage.API'));
    return API;
  };
  var _GetAPI = function(data) {
    var url = _.contains(window.location.pathname, 'test');
    if(url === true){
      API.Name = 'Test';
      return API;
    }
    else if(localStorage.getItem('AXC_API_Storage.API')){
      API = JSON.parse(localStorage.getItem('AXC_API_Storage.API'));
      return API;
    }
    else {
      API.Name = '';
      return API;
    }
  };
  var _RemoveAPI = function(data) {
    if(localStorage.getItem('AXC_API_Storage.API')){
      localStorage.removeItem('AXC_API_Storage.API');
      API = JSON.parse(localStorage.getItem('AXC_API_Storage.API'));
      return;
    } else {
      return;
    }
  };
  return {
    SetServer: _SetServer,
    GetServer: _GetServer,
    RemoveServer: _RemoveServer,
    SetAPI: _SetAPI,
    GetAPI: _GetAPI,
    RemoveAPI: _RemoveAPI
  };
})
    .factory('DBData', ['$http', function($http) {
      var _GetServers = function(data) {
        return $http.get('http://axcapps.harsco.com/DevelopmentEnvironmentWebAPI/api/servers').then(function(res){
          return res;
        });
      };
      var _GetUsers = function(data) {
        return $http.get('http://axcapps.harsco.com/DevelopmentEnvironmentWebAPI/api/users').then(function(res){
          return res;
        });
      };
      var _GetAPIs = function(data) {
        return $http.get('http://axcapps.harsco.com/DevelopmentEnvironmentWebAPI/api/apis').then(function(res){
          return res;
        });
      };
      var _GetAllData = function(data) {
        return $http.get('http://axcapps.harsco.com/DevelopmentEnvironmentWebAPI/api/all').then(function(res){
          return res;
        });
      };

      return {
        GetServers: _GetServers,
        GetUsers: _GetUsers,
        GetAPIs: _GetAPIs,
        GetAllData: _GetAllData
      };
    }]);
//////// Get Data //////////

// Restangular services
app.service('AppSecurity', ['Restangular', 'ServerAPI', function(Restangular, ServerAPI) {

      var BaseUrl = 'http://' + ServerAPI.GetServer().Name + '/appsecuritywebapi' + ServerAPI.GetAPI().Name + '/api';

      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(BaseUrl);
      });

}]);
(function(){
    app.factory('DataService', DataService);

    function DataService($q, AppSecurity){

        var service = {
            Login: Login,
            GetMenuItems: GetMenuItems

        };

        return service;

        function Login(data) {
            var deferred = $q.defer();
            var params = data;
            var results = AppSecurity.all('login').post(params).then(function(result){
                deferred.resolve(result);
            });
            return deferred.promise;
        };

        function GetMenuItems(data) {
            var deferred = $q.defer();
            var params = { UserName: data };
            var results = AppSecurity.all('menuitems').getList(params).then(function(result){
                deferred.resolve(result);
            });
            return deferred.promise;
        };



    }
    DataService.$inject = ['$q', 'AppSecurity'];;


})();
app.service('AppSecurityWebAPI', ['Restangular', 'ServerAPI', function(Restangular, ServerAPI) {

      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://axcapps.harsco.com/appsecuritywebapi/api/');
      });

}]);
app.factory('AuthService', ['$q', 'AppSecurityWebAPI', 'User', function($q, AppSecurityWebAPI, User) {
    var groups;

    var _GetGroups = function(data) {
        var self = this;
        var UserID = User;
        var deferred = $q.defer();
        var AuthData = { AppName: 'HammcoJobListing', UserName: UserID};
        var results = AppSecurityWebAPI.one('Groups').get(AuthData).then(function(result){
            groups = [];
            angular.forEach(result, function(value, key){
                groups.push(value.Role);
            });
            deferred.resolve(groups);
        });
        return deferred.promise;
    };

    var _IsAdmin = function() {
        var deferred = $q.defer();
        var UserID = User;
        var AuthData = { AppName: 'HammcoJobListing', UserName: UserID};
        var self = this;
        var isAdmin;
        if(groups) {
            isAdmin = _.contains(groups, 'Admin');
            return $q.when(isAdmin);
        } else {
            return _GetGroups(AuthData).then(function(result){
                isAdmin = _.contains(result, 'Admin');
                return isAdmin;
            });
        }

    };

    var _JobInput = function() {
        var deferred = $q.defer();
        var UserID = User;
        var AuthData = { AppName: 'HammcoJobListing', UserName: UserID};
        var self = this;
        var jobInput;
        if(groups) {
            jobInput = _.contains(groups, 'JobInput');
            return $q.when(jobInput);
        } else {
            return _GetGroups(AuthData).then(function(result){
                jobInput = _.contains(result, 'JobInput');
                return jobInput;
            });
        }

    };

    var _test = function(){
        return 'hello'
    }

    return {
        IsAdmin: _IsAdmin,
        GetGroups: _GetGroups,
        JobInput: _JobInput,
        Test: _test
    };
}]);