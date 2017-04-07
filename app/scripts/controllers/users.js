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
      return $this.getRecords().then(function(response) {
        var users = angular.copy(response);
        $scope.users = users.map(function(user){
          return {
            name: user.name.first + ' ' + user.name.last,
            email: user.email,
            profileImage: user.picture.large
          }
        })
      });
    };

    this.init([$this.getUsers()]);

  });
