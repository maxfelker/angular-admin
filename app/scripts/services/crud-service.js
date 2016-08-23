'use strict';

/**
 * @ngdoc service
 * @name adminApp.service:crudService
 * @description
 * Interacts with RESTful, CRUD oriented API endpoint
 */
angular.module('adminApp')
  .service('crudService', function ($resource) {

    var request = {
      url: '/:id',
      actions: {
        create: {
          method: 'POST'
        },
        retrieve: {
          method: 'GET'
        },
        update: {
          method: 'PATCH'
        },
        delete: {
          method: 'DELETE'
        },
        get: {
          method: 'GET',
          isArray: true
        }
      },
      parameters:{
        id: '@id'
      }
    };

    this.createRequestURL = function(options) {
      return options.url + request.url;
    };

    this.setActions = function(method,options) {
      if( angular.isDefined(options.isArray) ) {
        request.actions[method].isArray = options.isArray;
      }
      if( angular.isDefined(options.cache) ) {
        request.actions[method].cache = options.cache;
      }
      if( angular.isDefined(options.headers) ) {
        request.actions[method].headers = options.headers;
      }
    };

    this.generateResource = function(method,options) {
      this.setActions(method,options);
      var requestUrl = this.createRequestURL(options);
      return $resource(requestUrl, request.parameters, request.actions);
    };

    this.create = function (payload,options) {
      var requestResource = this.generateResource('create', options);
      return requestResource.create(payload).$promise;
    };

    this.retrieve = function (id, options) {
      var requestResource = this.generateResource('get', options);
      return requestResource.get({id: id}).$promise;
    };

    this.update = function (id,payload,options) {
      var requestResource = this.generateResource('update', options);
      return requestResource.update({id: id},payload).$promise;
    };

    this.delete = function (id,options) {
      var requestResource = this.generateResource('delete', options);
      return requestResource.delete({id: id}).$promise;
    };

    this.get = function (options) {
      var requestResource = this.generateResource('get', options);
      return requestResource.get().$promise;
    };

  });
