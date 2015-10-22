define([], function() {
    'use strict';

    var ReportCtrl = function($scope, $filter, playRoutes, ngTableParams) {
        $scope.worlds = [];
        $scope.world = '';
        $scope.totalDetected = 0;
        $scope.totalBanned = 0;
        $scope.totalDeleted = 0;

        /**
         * Setup date pickers
         */
        $scope.toDate = new Date();
        // default show data from 14 days ago till now
        $scope.fromDate = new Date($scope.toDate.getTime() - 14 * 24 * 60 * 60 * 1000);

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        };

        $scope.open = function($event, flag) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[flag] = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        /**
         * Setup table with content
         */
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {date: 'desc'}
        }, {
            total: 0,
            getData: function($defer, params) {
                var sortedField = Object.keys(params.sorting()).pop(),
                    offset = params.page() - 1,
                    limit = params.count(),
                    fromDate = $filter('date')($scope.fromDate, 'yyyy-MM-dd'),
                    toDate = $filter('date')($scope.toDate, 'yyyy-MM-dd'),
                    world = $scope.world || null,
                    field = sortedField,
                    sort = params.sorting()[sortedField];

                playRoutes.controllers.Reports.reports(offset, limit, fromDate, toDate, world, field, sort).get().then(function(response) {
                    $scope.totalDetected = response.data.totalDetected || 0;
                    $scope.totalBanned = response.data.totalBanned || 0;
                    $scope.totalDeleted = response.data.totalDeleted || 0;

                    params.total(response.data.totalRows);
                    $defer.resolve(response.data.rows);
                });
            }
        });

        $scope.reloadTable = function() {
            $scope.tableParams.reload();
        };

        playRoutes.controllers.Reports.worldsList().get().then(function(response) {
            $scope.worlds = response.data;
        });
    };

    ReportCtrl.$inject = ['$scope', '$filter', 'playRoutes', 'ngTableParams'];

    return {ReportCtrl: ReportCtrl};
});
