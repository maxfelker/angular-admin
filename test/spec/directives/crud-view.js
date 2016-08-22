'use strict';

describe('Directive: crudView', function () {

  // load the directive's module
  beforeEach(module('angularAdmin'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<crud-view></crud-view>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the crudView directive');
  }));
});
