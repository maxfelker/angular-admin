'use strict';

describe('Service: crudService', function () {

  // load the service's module
  beforeEach(module('angularAdmin'));

  // instantiate service
  var crudService;
  beforeEach(inject(function (_crudService_) {
    crudService = _crudService_;
  }));

  it('should do something', function () {
    expect(!!crudService).toBe(true);
  });

});
