'use strict';

/**
 * @ngdoc directive
 * @name angularAdmin.directive:crudView
 * @description
 * # crudView
 */
angular.module('angularAdmin')
  .directive('crudView', function () {
    return {
      templateUrl: '/views/directives/crud-view.html',
      restrict: 'E',
      controller: function() {
      }
    };
  });
