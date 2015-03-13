angular.module("parties", ['angular-meteor', 'ui.router', 'ngMaterial', 'angularUtils.directives.dirPagination'])
  .config(['paginationTemplateProvider', function (paginationTemplateProvider) {
    paginationTemplateProvider.setPath('client/partials/dir-pagination.ng.html');
  }]);

