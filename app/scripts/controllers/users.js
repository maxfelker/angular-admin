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

    this.serviceConfig = {
        url: 'http://localhost:3000/users'
    };

    this.transformUser = function(user) {
      return {
        id: 1, // Required for deleting and e
        name: user.name.first + ' ' + user.name.last,
        email: user.email,
        profileImage: user.picture.large
      }
    };

    this.getUsers = function() {
      return $this.getRecords().then(function(response) {
        var users = angular.copy(response);
        $scope.users = users.map($this.transformUser)
      });
    };

    this.deleteUser = function(id) {
      return $this.removeRecord($scope.users, id);
    };

    this.init([$this.getUsers()]);

  });
