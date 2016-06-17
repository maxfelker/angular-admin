'use strict';

/**
 * @ngdoc directive
 * @name adminApp.directive:listTable
 * @description
 * # listTable
 */
angular.module('adminApp')
  .directive('listTable', function() {

    var controller = function($scope) {

      $scope.deleteRecord = function(id) {
        return $scope.deleteHandler(id);
      };

      $scope.editRecord = function(id) {
        return $scope.editHandler(id);
      };

    };
    return {
      scope: {
        list: '=',
        animation: '@',
        deleteHandler: '=',
        editHandler: '='
      },
      controller: controller,
      templateUrl: '/views/directives/list-table.html',
      restrict: 'E'
    };
  });
