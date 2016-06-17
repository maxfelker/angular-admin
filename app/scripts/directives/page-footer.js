'use strict';

/**
 * @ngdoc directive
 * @name adminApp.directive:pageFooter
 * @description
 * # footer
 */
angular.module('adminApp')
  .directive('page-footer', function() {
    return {
      templateUrl: '/views/directives/footer.html',
      restrict: 'E'
    };
  });
