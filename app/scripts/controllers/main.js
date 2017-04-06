'use strict';

/**
 * @ngdoc function
 * @name angularAdmin.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularAdmin
 */
angular.module('angularAdmin')
  .controller('MainCtrl', function($scope) {
    this.init = function() {
      $scope.$parent.viewIsReady = true;
    };
    this.init();
  });
