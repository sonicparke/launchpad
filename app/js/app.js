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