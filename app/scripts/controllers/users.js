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
        },
        profileImage: {
          type: 'text',
          placeholder: 'http://placehold.it/69x69',
          value: '',
          required: true,
        }
        /*,
        category: {
          type: 'select',
          options: [{
            value: 1,
            text: 'Developer'
          }, {
            value: 2,
            text: 'n00b'
          }],
          required: true
        }*/
      };

    angular.extend(this, $controller('CrudBaseControllerCtrl',{$scope:$scope}));
    var $this = this;

    this.serviceConfig = {
        url: 'http://localhost:3000/users'
    };

    // TODO: Moved to service
    this.transformUser = function(user) {
      return {
        id: user.id,
        name: !user.name.first ? user.name : user.name.first + ' ' + user.name.last,
        email: user.email,
        profileImage: user.profileImage || user.picture.large
      }
    };

    this.getUsers = function() {
      return $this.getRecords().then(function(response) {
        var users = angular.copy(response);
        $scope.users = users.map($this.transformUser)
      });
    };

    this.showEditForm = function(id) {
        $this.setCrudObject($this.transformUser(record));
        $this.actionState = 'update';
    };

    this.showList = function() {
      delete this.crudObject.id;
      this.init([$this.getUsers()]);
    };

    this.updateUser = function(id) {
      return $this.updateRecord(id);
    };

    this.deleteUser = function(id) {
      return $this.removeRecord(id);
    };

    this.init([$this.getUsers()],crudObject);

  });
