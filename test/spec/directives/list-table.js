'use strict';

describe('Directive: listTable', function() {

  // load the directive's module
  beforeEach(module('adminApp'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<list-table></list-table>');
    element = $compile(element)(scope);
    expect(element).toBeDefined();
  }));

  //TODO: test scope function
});
