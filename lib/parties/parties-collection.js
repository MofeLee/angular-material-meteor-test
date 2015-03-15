Schemas = {};




Schemas.PartySchema = new SimpleSchema({
  name: {
    type: String
  },
  created: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    },
    denyUpdate: true
  },
  description: {
    type: String,
    optional: true,
    max : 3
  },
  "public": {
    type: Boolean,
    optional: true
  },
  owner: {
    type: String
  },
  location: {
    type: Object
  },
  "location.x" : {
    type: Number
  },
  "location.y" : {
    type: Number
  }
});

Schemas.PartyFormInsertSchema = Schemas.PartySchema.pick(['name', "description", "public","location","location.x","location.y" ]);

Parties = new Mongo.Collection("parties");
Parties.attachSchema(Schemas.PartySchema);
//Schemas.PartySchema.namedContext("partySchema");


Parties.allow({
  insert: function (userId, party) {
    return userId && party.owner === userId;
  },
  update: function (userId, party, fields, modifier) {
    if (userId !== party.owner) {
      return false;
    }

    return true;
  },
  remove: function (userId, party) {
    if (userId !== party.owner) {
      return false;
    }

    return true;
  }
});