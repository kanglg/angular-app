/**
 * Created by kanglg on 16/5/16.
 */
'use strict';
angular.module('angularApp').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('index', {
    url: '^/index',
    parent: 'main',
    templateUrl: 'views/index.html'
  });
}]);
