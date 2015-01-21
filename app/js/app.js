'use strict';

var app = angular.module('LaunchPad', ['restangular', 'ui.bootstrap', 'loader', 'ui.router', 'app.core']);


app.config(['$stateProvider', '$provide', '$httpProvider', '$tooltipProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $provide, $httpProvider, $tooltipProvider, $urlRouterProvider, $locationProvider){

    //$locationProvider.html5Mode(true);

  delete $httpProvider.defaults.headers.common['X-Requested-With'];


  $stateProvider
  .state('applist', {
      url: '/applist',
      templateUrl: 'app/partials/appList.html',
      controller: 'AppListViewCtrl'
  });
  // .state('login', {
  //     url: '/login',
  //     templateUrl: 'partials/login.html',
  //     controller: 'LoginViewCtrl'
  // });

  $urlRouterProvider.otherwise('applist');
  $tooltipProvider.options( {appendToBody: true} );
}]);

angular.module('app.core', []);

