'use strict';

/**
 * @ngdoc directive
 * @name angularAdmin.directive:listHeader
 * @description
 * # listHeader
 */
angular.module('angularAdmin')
  .directive('listHeader', function() {
    return {
      scope: {
        recordName: '@',
        buttonAction:'@',
        animation: '@',
        createHandler: '&'
      },
      templateUrl: '/views/directives/list-header.html',
      restrict: 'E'
    };
  });
