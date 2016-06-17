'use strict';

/**
 * @ngdoc directive
 * @name centerpointAdminApp.directive:listHeader
 * @description
 * # listHeader
 */
angular.module('centerpointAdminApp')
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
