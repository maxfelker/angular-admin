'use strict';

/**
 * @ngdoc directive
 * @name adminApp.directive:listHeader
 * @description
 * # listHeader
 */
angular.module('adminApp')
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
