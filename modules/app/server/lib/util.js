var throttle = function (callback) {
  setTimeout(function () {
    callback(null)
  }, 1500);
};

syncThrottle = Meteor.wrapAsync(throttle);
var x = {
  "$error": {
    "required": [{
      "$validators": {},
      "$asyncValidators": {},
      "$parsers": [null],
      "$formatters": [null, null],
      "$viewChangeListeners": [],
      "$untouched": true,
      "$touched": false,
      "$pristine": true,
      "$dirty": false,
      "$valid": false,
      "$invalid": true,
      "$error": {"required": true},
      "$name": "name",
      "$options": null
    }]
  },
  "$name": "trainingForm",
  "$dirty": false,
  "$pristine": true,
  "$valid": false,
  "$invalid": true,
  "$submitted": false,
  "name": {
    "$validators": {},
    "$asyncValidators": {},
    "$parsers": [null],
    "$formatters": [null, null],
    "$viewChangeListeners": [],
    "$untouched": true,
    "$touched": false,
    "$pristine": true,
    "$dirty": false,
    "$valid": false,
    "$invalid": true,
    "$error": {"required": true},
    "$name": "name",
    "$options": null
  },
  "description": {
    "$validators": {},
    "$asyncValidators": {},
    "$parsers": [null],
    "$formatters": [null, null, null],
    "$viewChangeListeners": [null],
    "$untouched": true,
    "$touched": false,
    "$pristine": true,
    "$dirty": false,
    "$valid": true,
    "$invalid": false,
    "$error": {},
    "$name": "description",
    "$options": null
  }
}