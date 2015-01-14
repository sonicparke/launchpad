//////////////////////////////////////////////////////////
//
// AXC WebAPI Server Select Directive
// Requires Angular UI Boostrap http://angular-ui.github.io/bootstrap/
//
//////////////////////////////////////////////////////////
angular.module('serverSelect', []);
app.directive('ngServerSelect', function () {
    var _template = '<div class="server-selector" ng-show="showServerSelect">' +
        '<style>' +
        '.server-selector .nav>li>a { padding: 5px; color: #ddd}' +
        '.server-selector .nav>li>a:hover { background-color: #444}' +
        '.server-selector .nav {padding-top: 0; margin-left: 50px;}' +
        '.server-selector {height: 20px; font-size: 10px; margin-top: 0;}' +
        '.server-selector { background: #444;}'+
        '.server-selector .t {margin-right: 0; padding: 5px; font-size: 10px; color: #ddd; line-height: 1em; text-transform: uppercase;}'+
        '.server-selector i { width: 11px;}' +
        '.server-selector .fa-check { color: #00FF52;}' +
        '</style>'+
        '<ul class="nav nav-horizontal pull-right" ng-init="GetServer()">' +
          '<li class="t">Server: </li>' +
          '<li ng-repeat="user in users" ng-click="SetServer(user)" ng-mouseover="hover = true;" ng-mouseout="hover = false;"><a href=""><i class="fa " ng-class="{\'fa-laptop\': user.name != selectedServer.name, \'fa-check\': user.name == selectedServer.name}" ></i> {{user.name}}</a></li>' +
          '<li ng-click="RemoveServer()"><a href=""><i class="fa fa-refresh"></i> Clear Servers</a></li>' +
        '</ul>'+
        '<ul class="nav nav-horizontal pull-right" ng-init="GetAPI()">' +
          '<li class="t">API: </li>' +
          '<li ng-repeat="api in apis" ng-click="SetAPI(api)"><a href=""><i class="fa " ng-class="{\'fa-database\': api.name != selectedAPI.name, \'fa-check\': api.name == selectedAPI.name}" ></i> {{api.name}}</a></li>' +
          '<li ng-click="RemoveAPI()"><a href=""><i class="fa fa-refresh"></i> Clear API</a></li>'+
        '</ul>' +
      '</div>';
    return{
        restrict: 'E,A',
        replace: true,
        controller: function($scope, User, ServerAPI){

          // Setup servers here
          $scope.users = [
            {'name': 'Brad McAlister','username': 'bmcalister', 'servername': 'axcuscatltbmca1'},
            {'name': 'Rob Riedinger','username': 'rriedinger', 'servername': 'axcuscatltrrie1'},
            {'name': 'Charlie Ray','username': 'cray', 'servername': 'axcuscatltcray2'},
            {'name': 'Web01','username': '', 'servername': 'axcapps.harsco.com'}
          ];

          $scope.apis = [
            {'name': 'Prod'},
            {'name': 'Dev'},
            {'name': 'Test'}
          ];

          // Get the current user from the asp.net yukiness
          $scope.currentUser = User;

          // Show or hide component based on user
          _.find($scope.users, function(user){
            if(user.username === $scope.currentUser){
              $scope.showServerSelect = true;
              return $scope.showServerSelect;
            } else {
              $scope.showServerSelect = false;
              return $scope.showServerSelect;
            }
          });

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

        },
        template: _template,
        scope:{},
        link:function (scope, element, attrs) {

        }
    };
});
app.factory('ServerAPI', function() {
  var Server = {};
  var API;
  return {
    SetServer: function(data) {
      localStorage.setItem('AXC_API_Storage.Server', JSON.stringify(data));
      Server = JSON.parse(localStorage.getItem('AXC_API_Storage.Server'));
      return Server;
    },
    GetServer: function(data) {
      var url = _.contains(window.location.pathname, 'test');
      if(url === true){
        Server = null;
        return Server;
      }
      else if(localStorage.getItem('AXC_API_Storage.Server')){
        Server = JSON.parse(localStorage.getItem('AXC_API_Storage.Server'));
        return Server;
      } else {
        Server = null;
      }
    },
    RemoveServer: function(data) {
      if(localStorage.getItem('AXC_API_Storage.Server')){
        localStorage.removeItem('AXC_API_Storage.Server');
        Server = JSON.parse(localStorage.getItem('AXC_API_Storage.Server'));
        return;
      } else {
        return;
      }
    },
    SetAPI: function(data) {
      localStorage.setItem('AXC_API_Storage.API', JSON.stringify(data));
      API = JSON.parse(localStorage.getItem('AXC_API_Storage.API'));
      return API;
    },
    GetAPI: function(data) {
      var url = _.contains(window.location.pathname, 'test');
      if(url === true){
        API = 'Test';
        return API;
      }
      else if(localStorage.getItem('AXC_API_Storage.API')){
        API = JSON.parse(localStorage.getItem('AXC_API_Storage.API'));
        return API;
      }
      else {
        API = false;
      }
    },
    RemoveAPI: function(data) {
      if(localStorage.getItem('AXC_API_Storage.API')){
        localStorage.removeItem('AXC_API_Storage.API');
        API = JSON.parse(localStorage.getItem('AXC_API_Storage.API'));
        return;
      } else {
        return;
      }
    }
  };
});