'use strict';

describe('The Crud Service', function() {

  beforeEach(module('angularAdmin'));

  var crudService;
  var httpBackend;
  var mockUsers = [
    {
      name: 'Max'
    },
    {
      name: 'Devin'
    }
  ];

  var url = 'http://locahost/user';

  beforeEach(inject(function($injector) {
    crudService = $injector.get('crudService');
    httpBackend = $injector.get('$httpBackend');
  }));

  describe('create()', function() {
    it('should make a POST request and create a record', function() {
      var options = {
        url: url
      };
      var payload = {
        name: 'Max'
      };
      httpBackend.expectPOST(/user/).respond(201,mockUsers[0]);
      crudService.create(payload,options).then(function(newUser){
        expect(newUser).toEqual(payload);
        httpBackend.flush();
      });
    });
  });


  describe('retrieve()', function() {

    it('should make a GET request and return a single record', function() {
      var options = {
        url: url
      };
      httpBackend.expectGET(/user\/\d+$/).respond(200,mockUsers[0]);
      crudService.retrieve(1,options).then(function(user){
        expect(user).toEqual(mockUsers[0]);
        httpBackend.flush();
      });
    });

    it('should be able to cache a call', function() {
      var options = {
        url: url,
        cache: true
      };
      httpBackend.expectGET(/user\/\d+$/).respond(200,mockUsers[0]);
      crudService.retrieve(1,options).then(function(user){
        expect(user).toEqual(mockUsers[0]);
        httpBackend.flush();
      });
    });

  });

  describe('update', function() {
    it('should make a PATCH request and update a record', function() {
      var options = {
        url: url
      };
      var payload = {
        name: 'Jared'
      };
      httpBackend.expectPATCH(/user\/\d+$/).respond(200,mockUsers[1]);
      crudService.update(2,payload,options).then(function(updateUser){
        expect(updateUser).toEqual(payload);
        httpBackend.flush();
      });
    });
  });

  describe('delete', function() {
    it('should make a DELETE request and delete a record', function() {
      var options = {
        url: url
      };
      httpBackend.expectDELETE(/user\/\d+$/).respond(200,{});
      crudService.delete(2,options).then(function(response){
        expect(response).toEqual({});
        httpBackend.flush();
      });
    });
  });

  describe('get()', function() {

    it('should make a GET request and return multiple records', function() {
      var options = {
        url: url
      };
      httpBackend.expectGET(/user/).respond(200,mockUsers);
      crudService.get(options).then(function(users){
        expect(users).toEqual(mockUsers);
        httpBackend.flush();
      });
    });

    it('should be able to accept an array as a response', function() {
      var options = {
        url: url,
        isArray: false
      };
      httpBackend.expectGET(/user/).respond(200,[mockUsers]);
      crudService.get(options).then(function(users){
        expect(users).toEqual([mockUsers]);
        httpBackend.flush();
      });
    });

  });

});
