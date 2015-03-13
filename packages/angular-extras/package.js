Package.describe({
  name: 'angular-extras'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use("urigo:angular", ["client", "server"])

  api.addFiles([

    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-aria/angular-aria.min.js',
    'bower_components/angular-material/angular-material.min.js',
    'bower_components/angular-material/angular-material.min.css'

  ], 'client');

});
