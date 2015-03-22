Meteor.publish("trainingDetail", function (trainingId) {
  return Training.find({_id: trainingId});
});