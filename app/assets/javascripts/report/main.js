/**
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular', './routes', './controllers'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('report', ['ngRoute', 'report.routes']);

    mod.controller('ReportCtrl', controllers.ReportCtrl);

    return mod;
});
