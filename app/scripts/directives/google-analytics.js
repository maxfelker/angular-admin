'use strict';

/**
 * @ngdoc directive
 * @name centerpointAdminApp.directive:googleAnalytics
 * @description
 * # googleAnalytics
 */
angular.module('centerpointAdminApp')
  .directive('googleAnalytics', function() {
    return {
      scope: {
        key: '@'
      },
      templateUrl: '/views/directives/google-analytics.html',
      restrict: 'E'
    };
  });
