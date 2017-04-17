'use strict';

describe('Controller: CrudBaseControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('angularAdmin'));

  var CrudBaseControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrudBaseControllerCtrl = $controller('CrudBaseControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('init', function () {
  });
});
