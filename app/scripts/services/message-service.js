'use strict';

/**
 * @ngdoc service
 * @name angularAdmin.messageService
 * @description
 * # messageService
 * Service in the angularAdmin.
 */
angular.module('angularAdmin').config(['ngToastProvider', function(ngToast) {
    ngToast.configure({
      animation: 'fade'
    });
  }])
  .service('messageService', function(ngToast) {

    function determineMessageText(msg, action) {
      var message = msg + '!';
      var actionMessage = '<strong>' + action + '</strong>: ' + msg + '!';
      var text = action ? actionMessage : message;
      return text;
    }

    function toast(type, msg, action) {
      var text = determineMessageText(msg, action);
      return ngToast.create({
        className: type,
        dismissButton: true,
        content: text
      });
    }

    this.display = function(type, msg, action) {
      return toast(type, msg, action);
    };

    this.success = function(msg, action) {
      return this.display('success', msg, action);
    };

    this.error = function(msg, action) {
      return this.display('danger', msg, action);
    };

    this.created = function(name) {
      var msg = 'You have created a new ' + name;
      return this.display('success', msg);
    };

    this.deleted = function(name) {
      var msg = 'You have deleted ' + name;
      return this.display('danger', msg);
    };

    this.updated = function(name) {
      var msg = 'You have updated ' + name;
      return this.display('success', msg);
    };

  });
