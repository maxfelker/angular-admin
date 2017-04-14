'use strict';

/**
 * @ngdoc function
 * @name angularAdmin.controller:CrudBaseControllerCtrl
 * @description
 * # CrudBaseControllerCtrl
 * Controller of the angularAdmin
 */
angular.module('angularAdmin')
  .controller('CrudBaseControllerCtrl', function ($scope, crudService, messageService, $q, $routeParams) {

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

    this.findRecord = function(records, id) {
      return records.filter(function(record) {
        return record.id === parseInt(id);
      })[0];
    };

    this.findRecordsIndex = function(records, id) {
      var record = this.findRecord(records, id);
      return records.indexOf(record);
    };


    this.makeRequest = function() {
      if (this.isActionState('create')) {
        this.createRecord();
      }
      if (this.isActionState('update')) {
        this.updateRecord();
      }
      return false;
    };

    /* List Methods */

    this.getRecords = function() {
      return crudService.get(this.serviceConfig);
    };

    this.getRecord = function() {
      return crudService.retrieve($routeParams.id,this.serviceConfig);
    };

    /* Create Methods */

    this.createRecordSuccess = function(apiResponse) {
      messageService.created(apiResponse.name);
      $this.init();
    };

    this.createRecord = function() {
      var payload = {};
      for (var fieldName in $this.crudObject) {
        var field = $this.crudObject[fieldName];
        payload[fieldName] = angular.copy(field.value);
      }
      return crudService.create(payload,this.serviceConfig).then($this.createRecordSuccess, $this.errorHandler);
    };

    /* --- Update --- */

    this.updateRecordSuccess = function(apiResponse) {
      messageService.updated(apiResponse.name);
    };

    this.updateRecord = function() {
      var payload = {};
      for (var fieldName in $this.crudObject) {
        var field = $this.crudObject[fieldName];
        if (fieldName !== 'id') {
          payload[fieldName] = angular.copy(field.value);
        }
      }
      return crudService.update($routeParams.id, payload,this.serviceConfig).then($this.updateRecordSuccess, $this.errorHandler);
    };

    /* --- Delete Methods --- */

    this.removeRecordSuccess = function(records, id) {
      messageService.deleted('Record' + id);
      var index = $this.findRecordsIndex(records, id);
      records.splice(index, 1);
    };

    this.removeRecord = function(records, id) {
      if (window.confirm('Are you sure you want to remove this record?')) {
        crudService.delete(id,this.serviceConfig).then(function() {
          $this.removeRecordSuccess(records, id);
        }, $this.errorHandler);
      }
    };

  });
