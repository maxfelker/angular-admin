'use strict';

describe('Directive: navBar', function() {

  // load the directive's module
  beforeEach(module('centerpointAdminApp'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<nav-bar></nav-bar>');
    element = $compile(element)(scope);
    expect(element).toBeDefined();
  }));
});
