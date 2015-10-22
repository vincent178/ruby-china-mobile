/** Common helpers */
define(['angular'], function(angular) {
  'use strict';

  var mod = angular.module('common.helper', []);
  mod.service('helper', function() {
    return {
      sayHi: function() {
        return 'hi';
      }
    };
  });
  return mod;
});
