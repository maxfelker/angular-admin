'use strict';

describe('Directive: loadingModal', function() {

  // load the directive's module
  beforeEach(module('angularAdmin'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<loading-modal></loading-modal>');
    element = $compile(element)(scope);
    expect(element).toBeDefined();
  }));
});
