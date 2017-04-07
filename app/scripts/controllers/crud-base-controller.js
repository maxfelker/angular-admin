'use strict';

/**
 * @ngdoc function
 * @name angularAdmin.controller:CrudBaseControllerCtrl
 * @description
 * # CrudBaseControllerCtrl
 * Controller of the angularAdmin
 */
angular.module('angularAdmin')
  .controller('CrudBaseControllerCtrl', function ($scope, crudService, messageService, $q) {

    var $this = this;

    this.init = function(promises, actionState) {
      $scope.$parent.viewIsReady = false;
      this.actionState = actionState || 'list';
      $q.all(promises).then($this.initSuccess, $this.errorHandler);
    };

    this.initSuccess = function() {
      $this.viewIsReady = true;
      $scope.$parent.viewIsReady = true;
      console.log('init success');
    };

    this.isActionState = function(actionState) {
      return this.actionState === actionState;
    };

    this.errorHandler = function(errorResponse) {
      var url = '<b>' + errorResponse.config.url + '</b>';
      var method = '<b>' + errorResponse.config.method + '</b>';
      messageService.error( 'There was an issue with ' + url);
    };

    this.getRecords = function() {
      return crudService.get({url:'http://localhost:3000/users'});
    };

  });
