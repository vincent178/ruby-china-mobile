/**
 * Common functionality.
 */
define(['angular', './services/helper', './services/playRoutes', './filters', './directives/example'],
    function(angular) {
  'use strict';

  return angular.module('common', ['common.helper', 'common.playRoutes', 'common.filters',
    'common.directives.example']);
});
