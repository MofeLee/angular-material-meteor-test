angular.module("parties", [
  'angular-meteor',
  'ui.router',
  'ngMaterial',
  'angularUtils.directives.dirPagination',
  'pascalprecht.translate'])
  .config(['paginationTemplateProvider', '$translateProvider', function (paginationTemplateProvider, $translateProvider) {
    paginationTemplateProvider.setPath('client/partials/dir-pagination.ng.html');

    // register german translation table
    $translateProvider.translations('de', {
      'GREETING': 'Hallo Welt!'
    });
    // register english translation table
    $translateProvider.translations('en', {
      'GREETING': 'Hello World!'
    });


  }]);

