Package.describe({
  name: 'angular-extras'
});

Npm.depends({
  'flat': '1.5.0',
  'body-parser':'1.12.2'
});

Package.onUse(function (api) {
  api.versionsFrom('1.0');

  api.use("urigo:angular", ["client", "server"]);
  api.use("webapp", [ "server"]);

  api.addFiles(['server_stuff.js'], 'server');

  api.addFiles([

    //'cdn.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-aria/angular-aria.min.js',
    'bower_components/angular-material/angular-material.min.js',
    'bower_components/angular-material/angular-material.min.css',

    'bower_components/angular-messages/angular-messages.js',
    'bower_components/angular-utils-pagination/dirPagination.js',
    'bower_components/angular-translate/angular-translate.min.js',

    /* textAngular */
    //rte
    // important: check rangy pre out or as soon textAngular updates its not necessary
    //'bower_components/textAngular/dist/textAngular-rangy.min.js',
    'bower_components/rangy/rangy-core.js',
    'bower_components/rangy/rangy-selectionsaverestore.js',
    // possible as cdn:
    'bower_components/textAngular/dist/textAngular-sanitize.min.js',
    'bower_components/textAngular/dist/textAngular.min.js',

    /* medium editor */
    'bower_components/medium-editor/dist/css/medium-editor.min.css',
    'bower_components/medium-editor/dist/css/themes/flat.min.css',
    'bower_components/medium-editor/dist/js/medium-editor.min.js',
    'bower_components/angular-medium-editor/dist/angular-medium-editor.min.js',

    /* angular ui-select */
    'bower_components/angular-ui-select/dist/select.js',
    'bower_components/selectize/dist/css/selectize.default.css',
    'bower_components/select2/select2.css',
    'bower_components/angular-ui-select/dist/select.css'




  ], 'client');

  api.export('flatten');

  api.export('Schemas');
  api.export('Form');
  api.export('Services');



});
