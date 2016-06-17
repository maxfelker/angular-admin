'use strict';

/**
 * @ngdoc directive
 * @name centerpointAdminApp.directive:loadingModal
 * @description
 * # loadingModal
 */
angular.module('centerpointAdminApp')
  .directive('loadingModal', function() {
    return {
      templateUrl: '/views/directives/loading-modal.html',
      restrict: 'E'
    };
  });
