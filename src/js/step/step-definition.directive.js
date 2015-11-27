(function() {
  'use strict';

  angular.module('surveyGenerator.step')
    .directive('stepDefinition', function() {
      return {
        restrict: 'E',
        scope: {
          step: '=',
          stepIndex: '@'
        },
        link: function(scope) {
          scope.step.id = scope.step.id || '';
          scope.step.actions = scope.step.actions || [];
          // scope.step.transitions = scope.step.transitions || [];

          scope.addAction = function() {
            scope.step.actions.push({});
          };

          scope.deleteAction = function(index) {
            scope.step.actions.splice(index, 1);
          };
        },
        templateUrl: 'js/step/step-defintion.html'
      };
    });
})();
