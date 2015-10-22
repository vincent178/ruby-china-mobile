/**
* Configure routes of reports module.
*/
define(['angular', './controllers', 'common', 'ui-bootstrap', 'ng-table'], function(angular, controllers) {
    'use strict';

    var mod = angular.module('report.routes', ['common', 'ui.bootstrap', 'ngTable']);

    mod.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/assets/javascripts/report/report.html',
            controller: controllers.ReportCtrl
    });
    }]);
});
