'use strict';

/**
 * @ngdoc function
 * @name angularAdmin.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the angularAdmin
 */
angular.module('angularAdmin')
  .controller('UsersCtrl', function ($scope, $controller, messageService, $location) {

    var crudObject = {
      name: {
        type: 'text',
        placeholder: 'Tom Jones',
        value: '',
        required: true,
      },
      email: {
        type: 'text',
        placeholder: 'youremail@host.com',
        value: '',
        required: true,
      }
    };

    angular.extend(this, $controller('CrudBaseControllerCtrl', {
      $scope: $scope
    }));
    var $this = this;

    // TODO: move service config to factory, pass that to controller
    this.serviceConfig = {
      url: 'http://localhost:3000/users'
    };

    // TODO: Moved to service
    this.transformUser = function (user) {
      return {
        id: user.id,
        name: !user.name.first ? user.name : user.name.first + ' ' + user.name.last,
        email: user.email
      };
    };

    /* Get Users */

    this.getUser = function () {
      return $this.getRecord().then(function (response) {
        var user = angular.copy(response);
        $this.setCrudObject($this.transformUser(user));
      });
    };

    this.getUsers = function () {
      return $this.getRecords().then(function (response) {
        var users = angular.copy(response);
        $scope.users = users.map($this.transformUser);
      });
    };

    /* Create Users */

    this.createUser = function () {
      var payload = {
        name: {
          first: $this.crudObject.name.value.split(' ')[0],
          last: $this.crudObject.name.value.split(' ')[1]
        },
        email: $this.crudObject.email.value,

      };
      return $this.createRecord(payload).then(function (user) {
        messageService.created(user.name.first);
        $location.path('/users/' + user.id);
      });
    };

    /* Update User */
    this.updateUser = function () {
      var payload = {
        name: {
          first: $this.crudObject.name.value.split(' ')[0],
          last: $this.crudObject.name.value.split(' ')[1]
        },
        email: $this.crudObject.email.value
      };
      return $this.updateRecord(payload).then(function (user) {
        messageService.updated(user.name.first);
        $location.path('/users/' + user.id);
      });
    };

    this.deleteUser = function (id) {
      return $this.removeRecord(id).then(function () {
        messageService.deleted('User ' + id);
        $this.getUsers();
      });
    };

    this.statePromises = {
      list: [
        $this.getUsers
      ],
      update: [
        $this.getUser
      ]
    };

    this.init(this.statePromises, crudObject);

  });
