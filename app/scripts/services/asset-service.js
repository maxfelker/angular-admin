'use strict';

/**
 * @ngdoc service
 * @name angularAdmin.assetService
 * @description
 * # assets
 * Service in the angularAdmin.
 */
angular.module('angularAdmin')
  .service('assetService', function($resource) {

    var requestURL = 'http://localhost:4200/assets/:id';

    var requestParameters = {
      id: '@id'
    };

    var actions = {
      getAssetList: {
        method: 'GET',
        isArray: true
      },
      getAsset: {
        method: 'GET'
      },
      createAsset: {
        method: 'POST'
      },
      updateAsset: {
        method: 'PATCH'
      },
      deleteAsset: {
        method: 'DELETE'
      }
    };

    var requestResource = $resource(requestURL, requestParameters, actions);

    this.getAssetList = function(query) {
      return requestResource.getAssetList(query).$promise;
    };

    this.getAsset = function(id) {
      return requestResource.getAsset({
        id: id
      }).$promise;
    };

    this.createAsset = function(payload) {
      return requestResource.createAsset(payload).$promise;
    };

    this.updateAsset = function(id,payload) {
      return requestResource.updateAsset({id: id},payload).$promise;
    };

    this.deleteAsset = function(id) {
      return requestResource.deleteAsset({
        id: id
      }).$promise;
    };

  });
