(function() {
  'use strict';

  angular.module('surveyGenerator')
    .directive('askQuestionData', function() {
      return {
        restrict: 'E',
        scope: {
          action: '='
        },
        link: function(scope) {
          var text = '';
          var resultColumn = '';
          var rules = '';

          if (!scope.action.hasOwnProperty('data')) {
            scope.action.data = {};
          }

          if (scope.action.data.hasOwnProperty('text')) {
            text = scope.action.data.text;
          }

          if (scope.action.data.hasOwnProperty('resultColumn')) {
            resultColumn = scope.action.data.resultColumn;
          }

          if (scope.action.data.hasOwnProperty('rules')) {
            rules = scope.action.data.rules;
          }

          scope.action.data = {
            text: text,
            resultColumn: resultColumn,
            rules: rules
          };
        },
        templateUrl: 'js/action/ask-question-data.html'
      };
    });
})();
