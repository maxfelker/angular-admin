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

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CrudBaseControllerCtrl.awesomeThings.length).toBe(3);
  });
});
