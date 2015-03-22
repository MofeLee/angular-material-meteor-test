Schemas = Schemas || {};

Schemas.Training = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  _audit: {
    type: Schemas.AuditMetaInfo,
    optional: true
  },
  comment: {
    type: String,
    optional: true
  },
  type: {
    // md-select
    type: String,
    optional: true
  },
  state: {
    // md-autocomplete
    type: String,
    optional: true
  }
});


Training = new Mongo.Collection("training");

Training.attachSchema(Schemas.Training);