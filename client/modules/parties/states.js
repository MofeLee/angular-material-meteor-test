angular.module("parties").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {


    $locationProvider.html5Mode(true);

    $stateProvider
      .state('parties', {
        url: '/parties',
        templateUrl: 'client/modules/parties/views/parties.ng.html',
        controller: 'PartiesListCtrl'
      })
      .state('parties.detail', {
        url: '/:partyId',
        templateUrl: 'client/modules/parties/views/party-details.ng.html',
        controller: 'PartyDetailsCtrl'
      });

    $urlRouterProvider.otherwise("/parties");
  }]);