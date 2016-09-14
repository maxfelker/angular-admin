'use strict';

/**
 * @ngdoc function
 * @name adminApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the adminApp
 */
angular.module('adminApp')
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
