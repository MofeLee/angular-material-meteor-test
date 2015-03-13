Parties = new Mongo.Collection("parties");

if (Meteor.isClient) {

  angular.module('socially', ['angular-meteor', 'ui.router', 'ngMaterial']);

  angular.module("socially").config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$mdThemingProvider', '$mdIconProvider',
    function ($urlRouterProvider, $stateProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {


      $mdIconProvider
        .defaultIconSet("/assets/svg/avatars.svg", 128)
        .icon("menu", "/assets/svg/menu.svg", 24)
        .icon("share", "/assets/svg/share.svg", 24)
        .icon("google_plus", "/assets/svg/google_plus.svg", 512)
        .icon("hangouts", "/assets/svg/hangouts.svg", 512)
        .icon("twitter", "/assets/svg/twitter.svg", 512)
        .icon("phone", "/assets/svg/phone.svg", 512);

      $mdThemingProvider.theme('default')
        .primaryPalette('brown')
        .accentPalette('red');


      $locationProvider.html5Mode(true);

      $stateProvider
        .state('parties', {
          url: '/parties',
          templateUrl: 'parties-list.ng.html',
          controller: 'PartiesListCtrl'
        })
        .state('parties.detail', {
          url: '/:partyId',
          templateUrl: 'party-details.ng.html',
          controller: 'PartyDetailsCtrl'
        });

      $urlRouterProvider.otherwise("/parties");
    }]);

  angular.module("socially").controller("PartiesListCtrl", ['$scope', '$meteor',
    function ($scope, $meteor) {

      $scope.parties = $meteor.collection(Parties);

      $scope.remove = function (party) {
        $scope.parties.splice($scope.parties.indexOf(party), 1);
      };

      $scope.removeAll = function () {
        $scope.parties.remove();
      };

    }]);

  angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor', '$state',
    function ($scope, $stateParams, $meteor, $state) {
      $scope.party = $meteor.object(Parties, $stateParams.partyId);

      $scope.updateParty = function (party) {
        party.save().then(function (numberOfDocs) {
          $state.go('parties');
        }, function (err) {
          console.log("update error", err);
        });
      }

    }]);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Parties.find().count() === 0) {
      var parties = [
        {
          'name': 'Dubstep-Free Zone',
          'description': 'Fast just got faster with Nexus S.'
        },
        {
          'name': 'All dubstep all the time',
          'description': 'Get it on!'
        },
        {
          'name': 'Savage lounging',
          'description': 'Leisure suit required. And only fiercest manners.'
        }
      ];
      for (var i = 0; i < parties.length; i++)
        Parties.insert({name: parties[i].name, description: parties[i].description});
    }
  });
}
