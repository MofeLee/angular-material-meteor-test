Meteor.methods({
  "insertParty": function (doc) {

    check(doc, Schemas.PartyFormInsertSchema);
    var userId = Meteor.userId();

    if (!userId) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    doc.owner = userId;

    var partyId = Parties.insert(doc);

    return partyId;
  },

  "updateParty": function (doc) {
    var docId = doc._id;
    var schema = Schemas.PartyFormUpdateSchema;
    var userId = Meteor.userId();


    Form.cleanAndValidateSchemaOnDoc(schema, doc, true);

    if (!userId) {
      throw new Meteor.Error(403, "You must be logged in");
    }


    var modif = Form.getModifFromDoc(doc);

    console.log(modif)
    Parties.update(docId, modif);
  }
});