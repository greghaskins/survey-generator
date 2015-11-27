(function() {
  'use strict';

  angular.module('surveyGenerator.action')
    .directive('actionDefinition', function() {
      return {
        restrict: 'E',
        scope: {
          action: '=',
          stepIndex: '@',
          actionIndex: '@'
        },
        link: function(scope, element) {
          element.on('click', function(event) {
            event.preventDefault();
          });

          scope.availableActions = [{
            type: 'AskQuestion',
            text: 'Ask Question'
          }, {
            type: 'DisplayContent',
            text: 'Display HTML'
          }];

          scope.select = function(selectedAction) {
            scope.action.type = selectedAction.type;
            scope.selectedItemText = selectedAction.text;
          };

          if (scope.action.hasOwnProperty('type')) {
            scope.availableActions.forEach(function(action) {
              if (action.type === scope.action.type) {
                scope.selectedItemText = action.text;
              }
            });
          } else {
            scope.select(scope.availableActions[0]);
          }
        },
        templateUrl: 'js/action/action-definition.html'
      };
    });
})();
