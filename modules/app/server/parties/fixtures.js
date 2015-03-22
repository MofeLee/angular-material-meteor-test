Meteor.startup(function () {
  if (Parties.find().count() === 0) {
    var parties = [
      {
        'name': 'Dubstep-Free Zone',
        'created': new Date(),
        'description': 'Fast just got faster with Nexus S.'
      },
      {
        'name': 'All dubstep all the time',
        'created': new Date(),
        'description': 'Get it on!'
      },
      {
        'name': 'Savage lounging',
        'created': new Date(),
        'description': 'Leisure suit required. And only fiercest manners.'
      }
    ];
    for (var i = 0; i < parties.length; i++)
      Parties.insert({name: parties[i].name, created: parties[i].created, description: parties[i].description});
  }
});