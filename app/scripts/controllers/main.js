'use strict';

/**
 * @ngdoc function
 * @name centerpointApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the centerpointApp
 */
angular.module('centerpointAdminApp')
  .controller('MainCtrl', function($scope) {
    this.init = function() {
      $scope.$parent.viewIsReady = true;
    };
    this.init();
  });
