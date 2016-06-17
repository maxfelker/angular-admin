'use strict';

describe('Asset Service', function() {

  // load the service's module
  beforeEach(module('centerpointAdminApp'));

  // instantiate service
  var assetService;
  var httpBackend;

  var mockAssetList = [{
    id: 1,
    owner: 1,
    type: 'PhaseRig',
    category: 'Structure',
    coordinates: '(949.0,10.0,2409.0)'
  }];

  beforeEach(inject(function($injector) {
    assetService = $injector.get('assetService');
    httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('getAssetList', function() {
    it('should make a GET request when calling getAssetList', function() {
      httpBackend.expectGET(/assets/).respond(mockAssetList);
      assetService.getAssetList();
      httpBackend.flush();
    });
  });

  describe('getAsset', function() {
    it('should make a GET request when calling getAsset', function() {
      var mockId = 1;
      httpBackend.expectGET(/assets\/\d+$/).respond(mockAssetList[0]);
      assetService.getAsset(mockId).then(function(response) {
        expect(response.id).toBe(mockId);
      });
      httpBackend.flush();
    });
  });

  describe('createAsset', function() {
    it('should make a POST request when calling createAsset', function() {
      httpBackend.expectPOST(/assets/).respond(mockAssetList[0]);
      var mockPaylod = angular.copy(mockAssetList[0]);
      delete mockPaylod.id;
      assetService.createAsset(mockPaylod);
      httpBackend.flush();
    });
  });

  describe('updateAsset', function() {
    it('should make a PATCH request when calling createAsset', function() {
      httpBackend.expectPATCH(/assets\/\d+$/).respond(mockAssetList[0]);
      var mockPaylod = {
        health: 50
      };
      assetService.updateAsset(1,mockPaylod);
      httpBackend.flush();
    });
  });

  describe('deleteAsset', function() {
    it('should make a DELETE request when calling deleteAsset', function() {
      httpBackend.expectDELETE(/assets\/\d+$/).respond(200);
      var mockId = 1;
      assetService.deleteAsset(mockId);
      httpBackend.flush();
    });
  });

});
