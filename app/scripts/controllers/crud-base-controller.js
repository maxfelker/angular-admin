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
    };

    this.isActionState = function(actionState) {
      return this.actionState === actionState;
    };

    this.errorHandler = function(errorResponse) {
      var url = '<b>' + errorResponse.config.url + '</b>';
      var method = '<b>' + errorResponse.config.method + '</b>';
      messageService.error( 'There was an issue with ' + url);
    };

    /* List Methods */

    this.getRecords = function() {
      return crudService.get(this.serviceConfig);
    };

    this.findRecordsIndex = function(records, id) {
      var record = records.filter(function(record) {
        return record.id === id;
      })[0];
      return records.indexOf(record);
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
