'use strict';
/**
 * @ngdoc function
 * @name centerpointAdminApp.controller:AssetListCtrl
 * @description
 * # AssetListCtrl
 * Controller of the centerpointAdminApp
 */
angular.module('centerpointAdminApp')
  .controller('AssetsCtrl', function($scope, $q, $filter, assetService, messageService) {

    var $this = this;

    this.generateCrudObject = function() {
      this.crudObject = {
        name: {
          type: 'text',
          placeholder: 'My New Asset',
          value: '',
          required: true,
        },
        prefab: {
          type: 'text',
          placeholder: 'PrefabNameInUnity',
          value: '',
          required: true,
        },
        category: {
          type: 'select',
          options: [{
            value: 1,
            text: 'Structures'
          }, {
            value: 2,
            text: 'Rocks'
          }],
          required: true
        }
      };
    };

    this.setAssetList = function(apiResponse) {
      $this.assetList = angular.copy(apiResponse);
    };

    this.getAssetList = function() {
      return assetService.getAssetList().then($this.setAssetList);
    };

    this.isActionState = function(actionState) {
      return this.actionState === actionState;
    };

    this.findAssetInList = function(id) {
      return $this.assetList.filter(function(asset) {
        return asset.id === id;
      })[0];
    };

    this.findAssetListIndex = function(id) {
      var asset = this.findAssetInList(id);
      return this.assetList.indexOf(asset);
    };

    this.initSuccess = function() {
      $this.viewIsReady = true;
      $scope.$parent.viewIsReady = true;
    };

    this.errorHandler = function(errorResponse) {
      var url = '<b>' + errorResponse.config.url + '</b>';
      var method = '<b>' + errorResponse.config.method + '</b>';
      messageService.error('The server: ' + url + ' and the method: ' + method + ' are currently unavailable');
    };

    this.createInitPromises = function() {
      return [
        $this.getAssetList()
      ];
    };

    this.makeInitPromises = function() {
      var promises = $this.createInitPromises();
      $q.all(promises).then($this.initSuccess, $this.errorHandler);
    };

    this.init = function() {
      $scope.$parent.viewIsReady = false;
      this.actionState = 'list';
      this.generateCrudObject();
      this.makeInitPromises();
    };

    this.createAssetSuccess = function(apiResponse) {
      messageService.created(apiResponse.name);
      $this.init();
    };

    this.createAsset = function() {
      var payload = {};
      for (var fieldName in $this.crudObject) {
        var field = $this.crudObject[fieldName];
        payload[fieldName] = angular.copy(field.value);
      }
      return assetService.createAsset(payload).then($this.createAssetSuccess, $this.errorHandler);
    };

    this.updateAssetSuccess = function(apiResponse) {
      messageService.updated(apiResponse.name);
    };

    this.updateAsset = function() {
      var payload = {};
      for (var fieldName in $this.crudObject) {
        var field = $this.crudObject[fieldName];
        if (fieldName !== 'id') {
          payload[fieldName] = angular.copy(field.value);
        }
      }
      return assetService.updateAsset(this.crudObject.id, payload).then($this.updateAssetSuccess, $this.errorHandler);
    };

    this.showCreateForm = function() {
      this.actionState = 'create';
    };

    this.setCrudObject = function(asset) {
      for (var fieldName in this.crudObject) {
        this.crudObject[fieldName].value = asset[fieldName];
      }
      this.crudObject.id = asset.id;
    };

    this.showEditForm = function(id) {
      var asset = $this.findAssetInList(id);
      $this.setCrudObject(asset);
      $this.actionState = 'update';
    };

    this.showList = function() {
      delete this.crudObject.id;
      this.init();
    };

    this.makeRequest = function() {
      if (this.isActionState('create')) {
        this.createAsset();
      }
      if (this.isActionState('update')) {
        this.updateAsset();
      }
      return false;
    };

    this.deleteAssetSuccess = function(id) {
      messageService.deleted('Asset ' + id);
      var index = $this.findAssetListIndex(id);
      $this.assetList.splice(index, 1);
    };

    this.deleteAsset = function(id) {
      if (window.confirm('Are you sure you want to remove this Asset?')) {
        assetService.deleteAsset(id).then(function() {
          $this.deleteAssetSuccess(id);
        }, $this.errorHandler);
      }
    };

    $this.init();

  });
