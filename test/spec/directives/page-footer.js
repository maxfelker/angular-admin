'use strict';

describe('Directive: pageFooter', function() {

  // load the directive's module
  beforeEach(module('adminApp'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<page-footer></page-footer>');
    element = $compile(element)(scope);
    expect(element).toBeDefined();
  }));
});
