(function() {
  'use strict';

  function resetData(scope) {
    var tempData = scope.action.data || {};

    scope.action.data = {
      html: tempData.html || ''
    };
  }

  angular.module('surveyGenerator')
    .directive('displayContentData', function() {
      return {
        restrict: 'E',
        scope: {
          action: '='
        },
        link: function(scope) {
          resetData(scope);
        },
        templateUrl: 'js/action/display-content-data.html'
      };
    });
})();
