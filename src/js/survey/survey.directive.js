(function() {
  'use strict';

  angular.module('surveyGenerator.survey')
    .directive('survey', function() {
      return {
        restrict: 'E',
        scope: {
          survey: '='
        },
        link: function(scope) {
          scope.createStep = function() {
            scope.survey.steps.push({});
          };

          scope.deleteStep = function(index) {
            scope.survey.steps.splice(index, 1);
          };
        },
        templateUrl: 'js/survey/survey.html'
      };
    });
})();
