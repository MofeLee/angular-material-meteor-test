var throttle = function (callback) {
  setTimeout(function () {
    callback(null)
  }, 1500);
};

syncThrottle = Meteor.wrapAsync(throttle);