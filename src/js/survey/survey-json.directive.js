(function() {
  'use strict';

  angular.module('surveyGenerator.survey')
    .directive('surveyJson', function() {
      return {
        restrict: 'E',
        scope: {
          survey: '='
        },
        link: function(scope) {
          scope.prettyJson = angular.toJson(scope.survey, true);
        },
        templateUrl: 'js/survey/survey-json.html'
      };
    });
})();
