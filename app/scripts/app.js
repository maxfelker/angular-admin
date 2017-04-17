'use strict';

/**
 * @ngdoc overview
 * @name angularAdmin
 * @description
 * # angularAdmin
 *
 * Main module of the application.
 */
angular
  .module('angularAdmin', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngToast'
  ])
  .config(function ($routeProvider, $locationProvider, $compileProvider) {
    //  $compileProvider.preAssignBindingsEnabled(true);
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mainCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'usersCtrl'
      })
      .when('/users/:id', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'usersCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
