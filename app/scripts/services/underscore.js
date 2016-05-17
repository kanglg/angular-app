/**
 * Created by kanglg on 16/5/10.
 */
'use strict';
angular.module('underscore', []).factory('_', ['$window', function($window) {
    return $window._;
}]);

