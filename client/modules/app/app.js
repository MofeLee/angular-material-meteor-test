var app = angular.module('socially', ['parties', 'training']);

var checkOnStates = {
  mustBeLoggedIn: ['parties', 'parties.details', 'training']
};


function forwardToLogin($translate, $state) {
  var lang = $translate.use();
  $state.go('app.banana', {locale: lang}, {notify: false});
}
var userLoggingLoadingHandling = ["$rootScope", "$state", "$translate", "$mdDialog", "$meteor", function ($rootScope, $state, $translate, $mdDialog, $meteor) {

  var loadDialog;
  $meteor.autorun($rootScope, function () {
    var loggingIn = $rootScope.getReactively('loggingIn');
    if (loggingIn && !loadDialog) {
      loadDialog = $mdDialog.show({
        templateUrl: 'client/partials/global-loading.ng.html',
        clickOutsideToClose: false,
        escapeToClose: false,
        parent: angular.element(document.body)
      });
    } else if (!loggingIn) {
      $rootScope.currentUserPromise.then(function (user) {
        var lang;
        if (user) {
          lang = user.languageKey;
        } else {
          lang = navigator.language.substr(0, 2);
        }
        //set interface language
        $translate.use(lang);
        $rootScope.$locale = lang;


        if (loadDialog) {
          $mdDialog.hide(loadDialog, 'finish');
          loadDialog = null;
        }
      });
    }


  });


  /**
   * check on $states where user must be logged in
   */
  $rootScope.$on('$stateChangeStart', function (e, to, params, from) {
    var foundRoute = _.contains(checkOnStates.mustBeLoggedIn, to.name);
    if (foundRoute) {
      if (!$rootScope.currentUser && !$rootScope.loggingIn) {
        e.preventDefault();
        forwardToLogin($translate, $state);
        // notify false means prevent $on again on new route
      } else if ($rootScope.loggingIn) {
        e.preventDefault();
        $rootScope.currentUserPromise.then(function () {
          $state.go(to.name, params);
        }, function () {
          forwardToLogin($translate, $state); // notify false means prevent $on again on new route
        });
      }
    }
  });
}];
app.run(userLoggingLoadingHandling);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('app', {
        abstract: true,
        url: '/:locale',
        template: "<ui-view/>",
        controller: ["$stateParams", "$rootScope", "$translate", function ($stateParams, $rootScope, $translate) {
          $translate.use($stateParams.locale);
          $rootScope.$locale = $stateParams.locale;
        }]
      })
      .state('app.banana', {
        url: '/banana',
        templateUrl: 'client/modules/parties/views/banana.ng.html'//,
        //controller: ['$stateParams', function ($stateParams) {
        //  var lang = $stateParams.locale;
        //  console.log(lang)
        //
        //}]
      });
  }]);


app.controller('AppCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
  $scope.toggleLeft = function () {
    $mdSidenav('left').toggle();
  };
  $scope.closeLeft = function () {
    $mdSidenav('left').close();
  }
}]);

app.directive("ptLoading", function () {
  return {
    scope: {
      message: "@"
    },
    templateUrl: 'client/partials/loading.ng.html'
  };
});