// `main.js` is the file that sbt-web will use as an entry point
(function (requirejs) {
    'use strict';

    // -- RequireJS config --
    requirejs.config({
        // Packages = top-level folders; loads a contained file named 'main.js"
        packages: ['common', 'home', 'report'],
        shim: {
            'jsRoutes': {
                deps: [],
                // it's not a RequireJS module, so we have to tell it what var is returned
                exports: 'jsRoutes'
            },
            // Hopefully this all will not be necessary but can be fetched from WebJars in the future
            'angular': {
                deps: ['jquery'],
                exports: 'angular'
            },
            'angular-route': ['angular'],
            'angular-cookies': ['angular'],
            'bootstrap': ['jquery'],
            'ng-table': ['angular'],
            'ui-bootstrap': ['angular']
        },
        paths: {
            'jquery': ['../lib/jquery/jquery'],
            'angular': ['../lib/angularjs/angular'],
            'angular-route': ['../lib/angularjs/angular-route'],
            'bootstrap': ['../lib/bootstrap/js/bootstrap'],
            'ui-bootstrap': ['../lib/angular-ui-bootstrap/ui-bootstrap-tpls'],
            'ng-table': ['../lib/ng-table/ng-table'],
            'jsRoutes': ['/jsroutes']
        }
    });

    requirejs.onError = function (err) {
        console.log(err);
    };

    // Load the app. This is kept minimal so it doesn't need much updating.
    require(['angular', 'angular-route', 'jquery', 'bootstrap', './app'], function (angular) {
        angular.bootstrap(document, ['app']);
    });
})(requirejs);
