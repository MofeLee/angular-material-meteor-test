Meteor.startup(function () {
  var user = Meteor.users.findOne({'emails.0.address': 'djgarms@gmail.com'});
  if (user) {
    Meteor.users.update(user._id, {$set: {languageKey: 'de'}});
  }
});