'use strict';

/**
 * @ngdoc function
 * @name angularAdmin.controller:CrudBaseControllerCtrl
 * @description
 * # CrudBaseControllerCtrl
 * Controller of the angularAdmin
 */
angular.module('angularAdmin')
  .controller('CrudBaseControllerCtrl', function ($scope, crudService, messageService, $q, $routeParams, $location) {

    var $this = this;

    this.init = function(promises, crudObject) {
      this.actionState = 'list';
      if($routeParams.id) {
        this.actionState = 'update';
      }
      if(crudObject){
          this.crudObject = angular.copy(crudObject);
      }
      $scope.$parent.viewIsReady = false;
      var initPromises = promises[this.actionState].map(function (fn){
        return fn();
      });
      $q.all(initPromises).then($this.initSuccess, $this.errorHandler);
    };

    this.initSuccess = function() {
      $this.viewIsReady = true;
      $scope.$parent.viewIsReady = true;
    };

    this.errorHandler = function(errorResponse) {
      var url = '<b>' + errorResponse.config.url + '</b>';
      var method = '<b>' + errorResponse.config.method + '</b>';
      messageService.error( 'There was an issue with ' + url);
    };

    /* Actions & State */
    this.isActionState = function(actionState) {
      return this.actionState === actionState;
    };

    this.setCrudObject = function(record) {
      for (var fieldName in this.crudObject) {
        this.crudObject[fieldName].value = record[fieldName];
      }
      this.crudObject.id = record.id;
    };

    this.showCreateForm = function() {
        this.actionState = 'create';
    };

    /* List Methods */

    this.getRecords = function() {
      return crudService.get(this.serviceConfig);
    };

    this.getRecord = function() {
      return crudService.retrieve($routeParams.id,this.serviceConfig);
    };

    /* Create Methods */

    this.createRecord = function(payload) {
      return crudService.create(payload, this.serviceConfig).catch($this.errorHandler);
    };

    /* --- Update --- */

    this.updateRecord = function(payload) {
      return crudService.update($routeParams.id, payload, this.serviceConfig).catch($this.errorHandler);
    };

    /* --- Delete Methods --- */

    this.removeRecord = function(id) {
      if (window.confirm('Are you sure you want to remove this record?')) {
        return crudService.delete(id, this.serviceConfig).catch($this.errorHandler);
      }
      return $q.reject();
    };

  });
