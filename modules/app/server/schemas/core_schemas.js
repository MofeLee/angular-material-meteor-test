Schemas = Schemas || {};

Schemas.AuditMetaInfo = new SimpleSchema({
  createdAt: {
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
        // list of action where update should be ignored
        if (this.field("_count.visits") && this.field("_count.visits")["isSet"] === true) {
          return this.unset();
        } else if (this.field("_count.favorites") && this.field("_count.favorites")["isSet"] === true) {
          return this.unset();
        } else {
          // set new Date
          return new Date();
        }
      }
    },
    denyInsert: true,
    optional: true
  }
});