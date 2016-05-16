/**
 * Created by kanglg on 16/5/10.
 */
angular.module('underscore', []).factory('_', ['$window', function($window) {
    return $window._;
}]);

