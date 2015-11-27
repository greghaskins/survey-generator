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
          var html = '';
          if (scope.action.hasOwnProperty('data') && scope.action.data.hasOwnProperty('html')) {
            html = scope.action.data.html;
          }

          scope.action.data = { html: html };
        },
        templateUrl: 'js/action/display-content-data.html'
      };
    });
})();
