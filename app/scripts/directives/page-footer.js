'use strict';

/**
 * @ngdoc directive
 * @name centerpointAdminApp.directive:pageFooter
 * @description
 * # pageFooter
 */
angular.module('centerpointAdminApp')
  .directive('pageFooter', function() {
    return {
      templateUrl: '/views/directives/page-footer.html',
      restrict: 'E'
    };
  });
