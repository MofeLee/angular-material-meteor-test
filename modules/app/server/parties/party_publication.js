Meteor.publish("parties", function (options, searchString) {
  if (searchString == null) {
    searchString = '';
  }
  Counts.publish(this, 'numberOfParties', Parties.find({
    'name': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'},
    $or: [
      {
        $and: [
          {"public": true},
          {"public": {$exists: true}}
        ]
      },
      {
        $and: [
          {owner: this.userId},
          {owner: {$exists: true}}
        ]
      }
    ]
  }), {noReady: true});

  syncThrottle();
  return Parties.find({
    'name': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'},
    $or: [
      {
        $and: [
          {"public": true},
          {"public": {$exists: true}}
        ]
      },
      {
        $and: [
          {owner: this.userId},
          {owner: {$exists: true}}
        ]
      }
    ]
  }, options);
});

Meteor.publish("partyDetail", function (partyId) {
  return Parties.find({_id: partyId});
});