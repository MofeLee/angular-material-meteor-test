

Meteor.publish(null, function () {
  //var start = new Date();
  //syncThrottle();
  //var end = new Date();
  //console.log("duration",end.getTime() - start.getTime())
  return Meteor.users.find({_id: this.userId});
});