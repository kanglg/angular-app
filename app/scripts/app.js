'use strict';
/**
 * @ngdoc overview
 * @name angularAppApp
 * @description
 * # angularAppApp
 *
 * Main module of the application.
 */
angular.module('angularApp', [
  'ngResource',
  'ui.router'
]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/index");
  $stateProvider.state('main', {
    abstract: true,
    url: '/main',
    templateUrl: 'views/main.html',
    controller: 'MainController',
    controllerAs: 'main'
  });
}]).run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$state = $state;
}]);
