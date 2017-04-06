'use strict';

/**
 * @ngdoc directive
 * @name angularAdmin.directive:googleAnalytics
 * @description
 * # googleAnalytics
 */
angular.module('angularAdmin')
  .directive('googleAnalytics', function() {
    return {
      scope: {
        key: '@'
      },
      templateUrl: '/views/directives/google-analytics.html',
      restrict: 'E'
    };
  });
