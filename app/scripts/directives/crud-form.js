'use strict';

/**
 * @ngdoc directive
 * @name centerpointAdminApp.directive:crudForm
 * @description
 * # crudForm
 */
angular.module('centerpointAdminApp')
  .directive('crudForm', function () {

    var controller = function($scope) {

      $scope.formData = [];

      $scope.whenErrorsArePresent = function() {
        return $scope[$scope.formName].$submitted && !$scope.validateForm();
      };

      $scope.validateForm = function() {
        return $scope[$scope.formName].$valid;
      };

      $scope.submitForm = function() {
        if( $scope.validateForm() ) {
          $scope.submitHandler();
        }
      };

      $scope.determineFormGroupClass = function(fieldName) {
        var formToCheck = $scope[$scope.formName];
        var fieldToCheck = formToCheck[fieldName];
        if( fieldToCheck.$valid && fieldToCheck.$dirty ||
          fieldToCheck.$valid && formToCheck.$submitted) {
          return 'has-success';
        }
        if( fieldToCheck.$invalid && fieldToCheck.$dirty ||
          fieldToCheck.$invalid && formToCheck.$submitted) {
          return 'has-warning';
        }
        return '';
      };

    };

    return {
      link: controller,
      scope: {
        actionState: '=',
        formName: '@',
        crudObject: '=',
        submitHandler: '&',
        cancelHandler: '&'
      },
      templateUrl: '/views/directives/crud-form.html',
      restrict: 'E'
    };

  });
