Meteor.methods({
  "insertParty": function (doc) {

    check(doc, Schemas.PartyFormInsertSchema)
    var userId =Meteor.userId();

    if (!userId) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    doc.owner = userId;

    var partyId = Parties.insert(doc);

    return partyId;
  }
});