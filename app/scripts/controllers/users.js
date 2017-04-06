'use strict';

/**
 * @ngdoc function
 * @name angularAdmin.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the angularAdmin
 */
angular.module('angularAdmin')
  .controller('UsersCtrl', function ($scope,$controller) {

    angular.extend(this, $controller('CrudBaseControllerCtrl',{$scope:$scope}));
    var $this = this;

    this.getUsers = function() {
      $this.getRecords(function(users) {
        $scope.users = angular.copy(users);
      });
    };

    this.getUsers();

  });
