'use strict';

describe('Directive: listHeader', function() {

  // load the directive's module
  beforeEach(module('adminApp'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<list-header></list-header>');
    element = $compile(element)(scope);
    expect(element).toBeDefined();
  }));
});
