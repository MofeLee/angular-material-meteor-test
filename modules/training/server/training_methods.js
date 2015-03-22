Meteor.methods({
  "insertTraining": function (doc) {
    var userId = Meteor.userId();

    if (!userId) {
      throw new Meteor.Error(400, "Not permitted");
    }
    return Services.Training.insertTraining(doc);
  },

  "updateTraining": function (doc) {
    var userId = Meteor.userId();

    if (!userId) {
      throw new Meteor.Error(400, "Not permitted");
    }

    return Services.Training.updateTraining(doc);
  }
});