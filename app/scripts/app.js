'use strict';

/**
 * @ngdoc overview
 * @name centerpointApp
 * @description
 * # centerpointApp
 *
 * Main module of the application.
 */
angular
  .module('centerpointAdminApp', [
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
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mainCtrl'
      })
      .when('/assets', {
        templateUrl: 'views/assets.html',
        controller: 'AssetsCtrl',
        controllerAs: 'assetsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
