angular.module("training").config(['$stateProvider',
  function ($stateProvider) {


    //$locationProvider.html5Mode(true);

    $stateProvider
      .state('trainingInsert', {
        url: '/training',
        templateUrl: 'modules/training/client/views/training_form.ng.html',
        controller: 'TrainingFormInsertCtrl'
      })
      .state('trainingUpdate', {
        url: '/training/:_id',
        templateUrl: 'modules/training/client/views/training_form.ng.html',
        controller: 'TrainingFormUpdateCtrl'
      });

  }]);