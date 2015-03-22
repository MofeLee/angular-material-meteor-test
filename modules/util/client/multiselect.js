angular.module('ptMultiSelect', ['ui.select', 'ngSanitize'])
  .config(['uiSelectConfig', function (uiSelectConfig) {
    uiSelectConfig.theme = 'select2';
  }]);
