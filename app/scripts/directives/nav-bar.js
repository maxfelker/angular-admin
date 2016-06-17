'use strict';

/**
 * @ngdoc directive
 * @name adminApp.directive:navBar
 * @description
 * # navBar
 */
angular.module('adminApp')
  .directive('navBar', function() {

    var controller = function($scope) {

      $scope.closeNav = function() {
        var elm = angular.element('#js-navbar-collapse');
        elm.removeClass('in');
      };

      $scope.openNav = function() {
        var elm = angular.element('#js-navbar-collapse');
        elm.addClass('in');
      };

      $scope.toggleNav = function() {
        var elm = angular.element('#js-navbar-collapse');
        if (elm.hasClass('in')) {
          elm.removeClass('in');
        } else {
          elm.addClass('in');
        }
      };

    };
    return {
      templateUrl: '/views/directives/nav-bar.html',
      restrict: 'E',
      controller: controller
    };
  });
