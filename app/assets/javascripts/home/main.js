/**
 * Main, shows the start page and provides controllers for the header and the footer.
 * This the entry module which serves as an entry point so other modules only have to include a
 * single module.
 */
define(['angular', './routes', './controllers'], function(angular, routes, controllers) {
  'use strict';

  var mod = angular.module('home', ['ngRoute', 'home.routes']);
  mod.controller('FooterCtrl', controllers.FooterCtrl);
  return mod;
});
