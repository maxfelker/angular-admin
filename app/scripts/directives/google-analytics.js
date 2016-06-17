'use strict';

/**
 * @ngdoc directive
 * @name adminApp.directive:googleAnalytics
 * @description
 * # googleAnalytics
 */
angular.module('adminApp')
  .directive('googleAnalytics', function() {
    return {
      scope: {
        key: '@'
      },
      templateUrl: '/views/directives/google-analytics.html',
      restrict: 'E'
    };
  });
