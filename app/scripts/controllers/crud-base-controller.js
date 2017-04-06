'use strict';

/**
 * @ngdoc function
 * @name angularAdmin.controller:CrudBaseControllerCtrl
 * @description
 * # CrudBaseControllerCtrl
 * Controller of the angularAdmin
 */
angular.module('angularAdmin')
  .controller('CrudBaseControllerCtrl', function ($scope, crudService) {

    var $this = this;

    this.getRecords = function(success) {
      return crudService.get({url:'http://localhost:3000/users'}).then(success);
    };

  });
