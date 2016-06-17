'use strict';

/**
 * @ngdoc function
 * @name adminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adminApp
 */
angular.module('adminApp')
  .controller('MainCtrl', function($scope) {
    this.init = function() {
      $scope.$parent.viewIsReady = true;
    };
    this.init();
  });
