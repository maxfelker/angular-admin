'use strict';

describe('The Users Management Controller', function () {

  var UsersCtrl;
  var scope;
  var usersJson;
  var httpBackend;
  var crudService;
  var messageService;

  beforeEach(module('angularAdmin'));

  function resolveInitDependencies() {
    httpBackend.flush();
    scope.$apply();
  }

  beforeEach(inject(function ($rootScope, $controller, $injector) {

    scope = $rootScope.$new();
    UsersCtrl = $controller('UsersCtrl', {
      $scope: scope
    });

    crudService = $injector.get('crudService');
    messageService = $injector.get('messageService');

    httpBackend = $injector.get('$httpBackend');
    httpBackend.whenGET(/users/).respond([{
      name: 'Bogan'
    }]);
    httpBackend.whenPOST(/users/).respond({
      name: 'Bogan'
    });
    httpBackend.whenPATCH(/users/).respond({
      name: 'Bogen'
    });
    httpBackend.whenDELETE(/users/).respond({});

  }));

  describe('When the controller loads', function () {

    it('should have the action state list', function () {
      expect(UsersCtrl.actionState).toBe('list');
    });

  });

  describe('When the user opens the create form', function () {

    it('should set the user list', function () {
      UsersCtrl.showCreateForm();
      expect(UsersCtrl.actionState).toBe('create');
    });

    it('should return true if actionState is create', function () {
      UsersCtrl.showCreateForm();
      expect(UsersCtrl.isActionState('create')).toBeTruthy();
    });

  });

  describe('when the user creates an User', function () {

    beforeEach(function () {
      spyOn(UsersCtrl, 'createUser').and.callThrough();
      spyOn(UsersCtrl, 'createRecord').and.callThrough();
      spyOn(crudService, 'create').and.callThrough();
      spyOn(UsersCtrl, 'errorHandler').and.callThrough();
    });

    it('should call the Create Crud Base Method which calls the Crud Service', function () {
      UsersCtrl.createUser({});
      expect(UsersCtrl.createRecord).toHaveBeenCalled();
      expect(crudService.create).toHaveBeenCalled();
    });

    /*  describe('when the errorHandler is called', function() {
        it('should call messageService.error creating the user is unsuccessful', function() {
          UsersCtrl.errorHandler('error');
          expect(messageService.error).toHaveBeenCalledWith('error');
        });
      });*/

  });

  describe('when the user updates an User', function () {

    beforeEach(function () {
      spyOn(UsersCtrl, 'updateUser').and.callThrough();
      spyOn(UsersCtrl, 'updateRecord').and.callThrough();
      spyOn(crudService, 'update').and.callThrough();
      spyOn(UsersCtrl, 'errorHandler').and.callThrough();
      spyOn(messageService, 'updated').and.callThrough();
    });

    it('should call the Create Crud Base Method which calls the Crud Service', function () {
      UsersCtrl.updateUser({});
      expect(UsersCtrl.updateRecord).toHaveBeenCalled();
      expect(crudService.update).toHaveBeenCalled();
    });

  });

  describe('when the deletes an user', function () {

    beforeEach(function () {
      spyOn(messageService, 'deleted').and.callThrough();
      spyOn(UsersCtrl, 'removeRecord').and.callThrough();
      spyOn(UsersCtrl, 'deleteUser').and.callThrough();
      spyOn(crudService, 'delete').and.callThrough();
    });

    it('should call window.confirm', function () {
      spyOn(window, 'confirm').and.callThrough();
      UsersCtrl.deleteUser(1);
      expect(window.confirm).toHaveBeenCalledWith(
        'Are you sure you want to remove this record?');
    });

    it('should call crudService.deleteUser', function () {
      spyOn(window, 'confirm').and.returnValue(true);
      UsersCtrl.deleteUser(1);
      expect(UsersCtrl.removeRecord).toHaveBeenCalled();
      expect(crudService.delete).toHaveBeenCalled();
    });

  });

});
