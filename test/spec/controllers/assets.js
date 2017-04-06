'use strict';

describe('The Assets Management Controller', function() {

  // load the controller's module
  beforeEach(module(
    'angularAdmin',
    'served/asset-list.json'
  ));

  var AssetsCtrl;
  var scope;
  var controller;
  var getAssetListDefferred;
  var assetListJSON;
  var httpBackend;
  var ngToast;
  var assetService;
  var messageService;

  beforeEach(inject(function($controller, $rootScope, $q, $injector, _servedAssetList_) {
    scope = $rootScope.$new();
    controller = $controller;
    assetListJSON = _servedAssetList_;
    getAssetListDefferred = $q.defer();
    httpBackend = $injector.get('$httpBackend');
    ngToast = $injector.get('ngToast');
    assetService = $injector.get('assetService');
    messageService = $injector.get('messageService');
  }));

  function registerSpies() {
    httpBackend.whenGET(/assets/).respond(assetListJSON);
  }

  function initController() {
    AssetsCtrl = controller('AssetsCtrl', {
      $scope: scope
    });
    registerSpies();
    scope.$digest();
  }

  function resolveInitDependencies() {
    httpBackend.flush();
    scope.$apply();
  }

  describe('When the controller loads', function() {

    beforeEach(function() {
      initController();
      resolveInitDependencies();
    });

    it('should set the asset list', function() {
      expect(AssetsCtrl.assetList).toBeDefined();
    });
    it('should have the action state list', function() {
      expect(AssetsCtrl.actionState).toBe('list');
    });

    describe('When the user opens the create form', function() {

      describe('showCreateForm', function() {
        it('should set the asset list', function() {
          AssetsCtrl.showCreateForm();
          expect(AssetsCtrl.actionState).toBe('create');
        });
        it('should return true if actionState is create', function() {
          AssetsCtrl.showCreateForm();
          expect(AssetsCtrl.isActionState('create')).toBeTruthy();
        });
      });

      describe('showList', function() {
        it('should change to list if the user exits', function() {
          AssetsCtrl.showList();
          expect(AssetsCtrl.actionState).toBe('list');
        });
      });

      describe('when the user creates an Asset', function() {

        beforeEach(function() {
          spyOn(AssetsCtrl, 'makeRequest').and.callThrough();
          spyOn(AssetsCtrl, 'createAsset').and.callThrough();
          spyOn(assetService, 'createAsset').and.callThrough();
          spyOn(AssetsCtrl, 'createAssetSuccess').and.callThrough();
          spyOn(AssetsCtrl, 'errorHandler').and.callThrough();
          spyOn(messageService, 'created').and.callThrough();
          spyOn(messageService, 'error').and.callThrough();
          spyOn(messageService, 'display').and.callThrough();
        });

        it('should call createAsset', function() {
          AssetsCtrl.showCreateForm();
          AssetsCtrl.makeRequest();
          expect(AssetsCtrl.createAsset).toHaveBeenCalled();
        });

        it('should call assetService.createAsset', function() {
          AssetsCtrl.showCreateForm();
          AssetsCtrl.makeRequest();
          expect(assetService.createAsset).toHaveBeenCalled();
        });

        it('shouldnt call createAsset if action is list', function() {
          AssetsCtrl.showList();
          expect(AssetsCtrl.makeRequest()).toBeFalsy();
        });

        describe('when the createAssetSuccess method is called', function() {
          it('should call messageService.created creating the asset is successful', function() {
            var payload = {
              name: 'success'
            };
            AssetsCtrl.createAssetSuccess(payload);
            expect(messageService.created).toHaveBeenCalledWith('success');
          });
        });

      /*  describe('when the errorHandler is called', function() {
          it('should call messageService.error creating the asset is unsuccessful', function() {
            AssetsCtrl.errorHandler('error');
            expect(messageService.error).toHaveBeenCalledWith('error');
          });
        });*/

        describe('when the messageService.display is called', function() {
          it('should call ngToast', function() {
            messageService.display('danger', 'bogan', 'test');
            expect(ngToast.messages[0].content).toBe('<strong>test</strong>: bogan!');
          });
        });

      });

      describe('when the user updates an Asset', function() {

        beforeEach(function() {
          spyOn(AssetsCtrl, 'makeRequest').and.callThrough();
          spyOn(AssetsCtrl, 'updateAsset').and.callThrough();
          spyOn(assetService, 'updateAsset').and.callThrough();
          spyOn(AssetsCtrl, 'updateAssetSuccess').and.callThrough();
          spyOn(AssetsCtrl, 'errorHandler').and.callThrough();
          spyOn(messageService, 'updated').and.callThrough();
        });

        it('should call updateAsset', function() {
          AssetsCtrl.showEditForm(1);
          AssetsCtrl.makeRequest();
          expect(AssetsCtrl.updateAsset).toHaveBeenCalled();
        });

        it('should call assetService.updateAsset', function() {
          AssetsCtrl.showEditForm(1);
          AssetsCtrl.makeRequest();
          expect(assetService.updateAsset).toHaveBeenCalled();
        });

        it('shouldnt call updateAsset if action is list', function() {
          AssetsCtrl.showList();
          expect(AssetsCtrl.makeRequest()).toBeFalsy();
        });

        describe('when the updateAssetSuccess method is called', function() {
          it('should call messageService.updated updating the asset is successful', function() {
            var payload = {
              name: 'Test'
            };
            AssetsCtrl.updateAssetSuccess(payload);
            expect(messageService.updated).toHaveBeenCalledWith('Test');
          });
        });

      });

      describe('when the deletes an asset', function() {

        beforeEach(function() {
          spyOn(messageService, 'deleted').and.callThrough();
          spyOn(AssetsCtrl, 'deleteAsset').and.callThrough();
          spyOn(assetService, 'deleteAsset').and.callThrough();
          spyOn(AssetsCtrl, 'deleteAssetSuccess').and.callThrough();
        });

        describe('when the user DELETES an asset', function() {
          it('should call window.confirm', function() {
            spyOn(window, 'confirm').and.callThrough();
            AssetsCtrl.deleteAsset(1);
            expect(window.confirm).toHaveBeenCalledWith(
              'Are you sure you want to remove this Asset?');
          });

          it('should call assetService.deleteAsset', function() {
            spyOn(window, 'confirm').and.returnValue(true);
            AssetsCtrl.deleteAsset(1);
            expect(assetService.deleteAsset).toHaveBeenCalledWith(1);
          });

          describe('deleteAssetSuccess', function() {

            it('should call messageService.deleted', function() {
              AssetsCtrl.deleteAssetSuccess(1);
              expect(messageService.deleted).toHaveBeenCalledWith('Asset 1');
            });

          });

        });

      });

    });

  });

});
