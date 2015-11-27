(function() {
  'use strict';

  angular.module('surveyGenerator.survey')
    .controller('SurveyController', SurveyController);

  function SurveyController() {
    this.survey = { steps: [] };
    this.outputJson = false;

    this.toggleJson = function() {
      this.outputJson = !this.outputJson;
    };
  }
})();
