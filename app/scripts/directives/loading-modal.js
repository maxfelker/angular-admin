'use strict';

/**
 * @ngdoc directive
 * @name angularAdmin.directive:loadingModal
 * @description
 * # loadingModal
 */
angular.module('angularAdmin')
  .directive('loadingModal', function() {
    return {
      templateUrl: '/views/directives/loading-modal.html',
      restrict: 'E'
    };
  });
