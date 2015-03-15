angular.module("parties").config(['$mdThemingProvider', '$mdIconProvider',
  function ($mdThemingProvider, $mdIconProvider) {


    $mdIconProvider
      .defaultIconSet("/assets/svg/avatars.svg")
      .icon("menu", "/assets/svg/menu.svg")
      .icon("share", "/assets/svg/share.svg")
      .icon("google_plus", "/assets/svg/google_plus.svg")
      .icon("hangouts", "/assets/svg/hangouts.svg")
      .icon("twitter", "/assets/svg/twitter.svg")
      .icon("phone", "/assets/svg/phone.svg");

    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('red');

  }]);