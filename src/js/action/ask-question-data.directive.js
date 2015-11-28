(function() {
  'use strict';

  function syncRules(rules, actionRules) {
    angular.forEach(rules, function(rule) {
      if (actionRules.indexOf(rule.name) !== -1) {
        rule.checked = true;
      }
    });
  }

  function resetData(scope) {
    var tempData = scope.action.data || {};

    scope.action.data = {
      text: tempData.text || '',
      resultColumn: tempData.resultColumn || '',
      rules: tempData.rules || []
    };
  }

  angular.module('surveyGenerator')
    .directive('askQuestionData', function() {
      return {
        restrict: 'E',
        scope: {
          action: '=',
          stepIndex: '@',
          actionIndex: '@'
        },
        link: function(scope) {
          scope.rules = [{
            text: 'Is a whole number',
            name: 'IsAWholeNumber',
            checked: false
          }, {
            text: 'Required',
            name: 'Required',
            checked: false
          }];

          resetData(scope);

          syncRules(scope.rules, scope.action.data.rules);

          scope.$watch(function() {
            return scope.rules.map(function(rule) {
              return rule.checked;
            });
          }, function() {
            scope.action.data.rules = [];

            angular.forEach(scope.rules, function(value) {
              if (value.checked) {
                scope.action.data.rules.push(value.name);
              }
            });
          }, true);
        },
        templateUrl: 'js/action/ask-question-data.html'
      };
    });
})();
