(function() {
  'use strict';

  angular.module('surveyGenerator')
    .directive('displayContentData', function() {
      return {
        restrict: 'E',
        scope: {
          action: '='
        },
        link: function(scope) {
          scope.action.data = scope.action.data || {};
          scope.action.data.html = scope.action.data.html || '';
        },
        templateUrl: 'js/action/display-content-data.html'
      };
    });
})();
