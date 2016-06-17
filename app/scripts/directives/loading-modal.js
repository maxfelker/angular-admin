'use strict';

/**
 * @ngdoc directive
 * @name adminApp.directive:loadingModal
 * @description
 * # loadingModal
 */
angular.module('adminApp')
  .directive('loadingModal', function() {
    return {
      templateUrl: '/views/directives/loading-modal.html',
      restrict: 'E'
    };
  });
