Meteor.methods({
  "insertParty": function (doc) {

    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    var partyId = Parties.insert(doc, function (err) {
      if (err) {
        Meteor.Error(400, err);
      }
    });

    return partyId;
  }
});