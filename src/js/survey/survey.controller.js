(function() {
  'use strict';

  angular.module('surveyGenerator.survey')
    .controller('SurveyController', SurveyController);

  function SurveyController() {
    this.survey = { steps: [] };
    this.outputJson = false;
    this.isCollapsed = true;

    this.toggleCollapse = function() {
      this.isCollapsed = !this.isCollapsed;
    };

    this.toggleJson = function() {
      this.outputJson = !this.outputJson;
    };

    this.reset = function(event) {
      event.preventDefault();

      this.survey = { steps: [] };
      this.outputJson = false;
    };
  }
})();
