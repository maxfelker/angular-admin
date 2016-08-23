'use strict';

describe('Service: messageService', function () {

  // load the service's module
  beforeEach(module('adminApp'));

  // instantiate service
  var messageService;
  var ngToast;
  beforeEach(inject(function (_messageService_, $injector) {
    messageService = _messageService_;
    ngToast = $injector.get('ngToast');
  }));

  it('should call ngToast when display method is used', function() {
    messageService.display('danger', 'bogan', 'test');
    expect(ngToast.messages[0].content).toBe('<strong>test</strong>: bogan!');
  });

  it('should call display when success method is used', function() {
    messageService.success('bogan', 'test');
    expect(ngToast.messages[0].content).toBe('<strong>test</strong>: bogan!');
    expect(ngToast.messages[0].className).toBe('success');
  });

  it('should call display when error method is used', function() {
    messageService.error('bogan', 'test');
    expect(ngToast.messages[0].content).toBe('<strong>test</strong>: bogan!');
    expect(ngToast.messages[0].className).toBe('danger');
  });

  it('should call display when created method is used', function() {
    messageService.created('bogan');
    expect(ngToast.messages[0].content).toBe('You have created a new bogan!');
    expect(ngToast.messages[0].className).toBe('success');
  });

  it('should call display when deleted method is used', function() {
    messageService.deleted('bogan');
    expect(ngToast.messages[0].content).toBe('You have deleted bogan!');
    expect(ngToast.messages[0].className).toBe('danger');
  });

  it('should call display when updated method is used', function() {
    messageService.updated('bogan');
    expect(ngToast.messages[0].content).toBe('You have updated bogan!');
    expect(ngToast.messages[0].className).toBe('success');
  });

});
