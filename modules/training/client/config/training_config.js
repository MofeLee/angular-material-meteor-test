angular.module("training", [
  'angular-meteor',
  'ui.router',
  'ngMaterial',
  'pascalprecht.translate',
  'ngMessages',
  'textAngularPt',
  'ptMultiSelect'])
  .config(['$translateProvider', function ($translateProvider) {

    // register german translation table
    $translateProvider.translations('de', {
      'GREETING': 'Hallo Welt!',
      'FORM_VALIDATION_REQUIRE': 'Dieses Feld ist ein Pflichtfeld',
      'FORM_VALIDATION_REGEX': 'Dieses Feld ist eine Email'
    });
    // register english translation table
    $translateProvider.translations('en', {
      'GREETING': 'Hello World!',
      'FORM_VALIDATION_REQUIRE': 'This field is required',
      'FORM_VALIDATION_REGEX': 'This field must be an email'
    });


  }]);

