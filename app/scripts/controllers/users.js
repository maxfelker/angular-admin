'use strict';

/**
 * @ngdoc function
 * @name angularAdmin.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the angularAdmin
 */
angular.module('angularAdmin')
  .controller('UsersCtrl', function ($scope,crudService) {

    var $this = this;

    this.setUsers = function(apiResponse) {
      $scope.users = angular.copy(apiResponse);
    };

    this.getUsers = function() {
      return crudService.get({url:'http://localhost:3000/users'}).then($this.setUsers);
    };

    this.getUsers();

  });
