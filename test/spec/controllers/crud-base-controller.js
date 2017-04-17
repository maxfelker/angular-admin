'use strict';

describe('The CrudBaseControllerCtrl', function () {

  var $scope;

  beforeEach(module('angularAdmin'));

  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controller('CrudBaseControllerCtrl', {
      $scope: $scope
    });
  }));

  it('should init with the $parent scopes viewIsReady set to false', function () {
    expect($scope.$parent.viewIsReady).toBeFalsy();
  });

});
