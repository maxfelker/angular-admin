'use strict';

/**
 * @ngdoc directive
 * @name angularAdmin.directive:pageFooter
 * @description
 * # footer
 */
angular.module('angularAdmin')
  .directive('page-footer', function() {
    return {
      templateUrl: '/views/directives/footer.html',
      restrict: 'E'
    };
  });
