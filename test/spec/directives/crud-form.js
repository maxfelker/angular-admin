'use strict';

describe('The Crud Form', function () {

  var element;
  var scope;
  var $compile;
  var form;
  var input;
  var isolatedScope;

  function createFormObject() {
    isolatedScope.testForm = {
      $valid: false,
      $invalid: false,
      $submitted: false,
      $name: 'testForm',
      name: {
        $name: 'name',
        $invalid: false,
        $valid: true,
        $viewValue: '',
        $setViewValue: function (value) {
          this.$viewValue = value;
        }
      }
    };
  }

  function generateDirectiveTemplate() {
    var template = '<crud-form ';
    template += 'form-name="testForm" ';
    template += 'action-state="actionState" ';
    template += 'crud-object="testCrudObject" ';
    template += 'create-handler="testCreateHandler()" ';
    template += '></crud-form>';
    return template;
  }

  function compileDirective() {
    var template = angular.element(generateDirectiveTemplate());
    element = $compile(template)(scope);
    scope.$digest();
    form = angular.element(element.find('form')[0]);
    input = angular.element(form.find('input')[0]);
    isolatedScope = element.isolateScope();
    createFormObject();
    scope.$apply();
  }

  beforeEach(module('angularAdmin', 'ngHtml2Js'));

  beforeEach(inject(function ($injector) {

    $compile = $injector.get('$compile');
    scope = $injector.get('$rootScope');
    scope.actionState = 'create';
    scope.testCrudObject = {
      name: {
        type: 'text',
        placeholder: 'Tom Jones',
        value: '',
        required: true,
      }
    };
  }));

  describe('when submitting the form', function () {

    beforeEach(function () {
      compileDirective();
      spyOn(isolatedScope, 'validateForm').and.callThrough();
      spyOn(isolatedScope, 'createHandler').and.callThrough();
      spyOn(isolatedScope, 'updateHandler').and.callThrough();
    });

    it('should validate the form', function () {
      isolatedScope.submitForm();
      expect(isolatedScope.validateForm).toHaveBeenCalled();
    });

    describe('when validating the form', function () {

      it('should return if its valid or not', function () {
        isolatedScope.submitForm();
        var validTest = isolatedScope.validateForm();
        expect(validTest).toEqual(isolatedScope.testForm.$valid);
      });

      it('should display an error', function () {
        isolatedScope.submitForm();
        isolatedScope.testForm.$submitted = true;
        expect(isolatedScope.whenErrorsArePresent()).toBeTruthy();
      });

    });

    describe('when the form is valid', function () {

      it('should determine the handler to call by using the action state passed to the form', function () {
        isolatedScope.testForm.$valid = true;
        isolatedScope.submitForm();
        expect(isolatedScope.createHandler).toHaveBeenCalled();
      });
    });

  });

  describe('when determing a class for the field', function () {

    beforeEach(function () {
      compileDirective();
      isolatedScope.testForm.name.$setViewValue('');
      scope.$digest();
    });

    it('should return no class initially', function () {
      var classTest = isolatedScope.determineFormGroupClass('name');
      expect(classTest).toEqual('');
    });

    it('should return has-success when valid', function () {
      isolatedScope.testForm.name.$setViewValue('ABC123');
      isolatedScope.testForm.name.$valid = true;
      isolatedScope.testForm.name.$dirty = true;
      isolatedScope.submitForm();

      var classTest = isolatedScope.determineFormGroupClass('name');
      expect(classTest).toEqual('has-success');
    });

    it('should return has-failure when required and dirty', function () {
      isolatedScope.testForm.name.$setViewValue('');
      isolatedScope.testForm.name.$dirty = true;
      isolatedScope.testForm.name.$invalid = true;
      isolatedScope.testForm.name.$valid = false;
      var classTest = isolatedScope.determineFormGroupClass('name');
      expect(classTest).toEqual('has-warning');
    });

    it('should return has-failure when required and submmited', function () {
      isolatedScope.testForm.name.$setViewValue('');
      isolatedScope.testForm.name.$invalid = true;
      isolatedScope.testForm.name.$valid = false;
      isolatedScope.testForm.$submitted = true;
      var classTest = isolatedScope.determineFormGroupClass('name');
      expect(classTest).toEqual('has-warning');
    });

  });

});
