Schemas = Schemas || {};

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
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  emails: {
    type: [Object],
    // this must be optional if you also use other login services like facebook,
    // but if you use only accounts-password, then it can be required
    optional: true
  },
  "emails.$": {
    type: Object,
    optional: true
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  description: {
    type: String,
    optional: true
  },
  "public": {
    type: Boolean,
    optional: true
  },
  owner: {
    type: String,
    optional:true
  },
  location: {
    type: Object,
    optional:true
  },
  "location.x": {
    type: Number
  },
  "location.y": {
    type: Number
  }
});

Schemas.PartyFormInsertSchema = Schemas.PartySchema.pick(['name', "description", "created", "public", "location", "location.x", "location.y"]);

//Schemas.PartyFormUpdateSchemaCombined = new SimpleSchema([Schemas.PartySchema, Schemas.BaseEmailAdress]);

Schemas.PartyFormUpdateSchema = Schemas.PartySchema.pick(['name', 'description', "updatedAt", "emails", "emails.$", "emails.$.address"]);

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