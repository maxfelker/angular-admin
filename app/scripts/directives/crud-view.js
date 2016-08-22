'use strict';

/**
 * @ngdoc directive
 * @name adminApp.directive:crudView
 * @description
 * # crudView
 */
angular.module('adminApp')
  .directive('crudView', function () {
    return {
      templateUrl: '/views/directives/crud-view.html',
      restrict: 'E',
      controller: function() {
      }
    };
  });
