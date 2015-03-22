//function removeEmptyObjects(doc) {
//  _.each(doc, function (val, key) {
//    if (_.isObject(val) && _.isEmpty(val)) {
//      delete doc[key];
//    } else if (_.isArray(val)) {
//      doc[key] = _.without(val, _.find(val, _.isEmpty));
//    }else if (_.isObject(val)) {
//      removeEmptyObjects(val)
//    }
//  })
//}
//var cleanTool = function (schema, doc) {
//  schema.clean(doc);
//  removeEmptyObjects(doc);
//};

//var validateSchemaContext = function (schema, doc, scopeForm) {
//
//
//  //cleanTool(schema, doc);
//
//
//  var valContext = schema.newContext();
//
//  //var self = this;
//
//  var valid = valContext.validate(doc);
//  if (!valid) {
//
//    var invalidKeys = valContext.invalidKeys();
//    invalidKeys.forEach(function (field) {
//
//      console.log("field", field);
//      var formField = scopeForm[field.name];
//      if (formField) {
//        //debugger;
//        formField.$setValidity(field.type, false);
//        //self.partyForm.$setInvalid();
//      } else {
//        console.log("cannot set invalid state for %s", field.name);
//      }
//
//    });
//  }
//  return valid;
//};

angular.module("parties").controller("PartiesListCtrl", ['$scope', '$meteor', '$rootScope', '$mdToast', "$q",
  function ($scope, $meteor, $rootScope, $mdToast, $q) {

    $scope.search = {
      page: 1,
      perPage: 3,
      sort: {name: 1},
      orderProperty: '1',
    };


    $scope.parties = $meteor.collection(function () {
      return Parties.find({}, {
        sort: $scope.getReactively('search.sort')
      });
    });

    var subscriptionHandleX;


    $meteor.autorun($scope, function () {

      $scope.loading = true;
      $meteor.subscribe('parties', {
        limit: parseInt($scope.getReactively('search.perPage')),
        skip: (parseInt($scope.getReactively('search.page')) - 1) * parseInt($scope.getReactively('search.perPage')),
        sort: $scope.getReactively('search.sort')
      }, $scope.getReactively('search.search')).then(function (handle) {
        subscriptionHandleX = handle;
        $scope.loading = false;
        $scope.partiesCount = $meteor.object(Counts, 'numberOfParties', false);
      });


    });


    $scope.$on('$destroy', function () {
      subscriptionHandleX.stop();
    });


    $scope.remove = function (party) {
      $scope.parties.splice($scope.parties.indexOf(party), 1);
    };

    $scope.removeAll = function () {
      $scope.parties.remove();
    };

    $scope.createParty = function (party) {

      party = party || {};
      var valContext = Schemas.PartyFormInsertSchema.newContext();

      var self = this;
      if (!valContext.validate(party)) {

        var invalidKeys = valContext.invalidKeys();
        $scope.invalidKeys = invalidKeys;


        invalidKeys.forEach(function (field) {

          console.log("field", field);
          var formField = self.partyForm[field.name];
          if (formField) {
            //debugger;
            formField.$setValidity(field.type, false);
            //self.partyForm.$setInvalid();
          } else {
            console.log("cannot set invalid state for %s", field.name);
          }

        });


      } else {


        //$scope.parties.push(party);
        $meteor.call("insertParty", party).then(function (data) {

          console.log(arguments)
          self.newParty = {};
          // not working 100%
          self.partyForm.name.$touched = false;
          self.partyForm.$setUntouched();
          self.partyForm.$setPristine();
        }, function (error) {

          $mdToast.show($mdToast.simple()
              .content('Oh oh, something does not seem to be good!')
          );
          console.log(error)
        });
      }


      //$scope.newParty = {};
      //$scope.partyForm.$setValidity();
      //$scope.partyForm.$setPristine();
    };

    $scope.pageChanged = function (newPage) {
      $scope.search.page = newPage;
    };


    $scope.$watch('search.orderProperty', function () {
      if ($scope.search.orderProperty)
        $scope.search.sort = {name: parseInt($scope.search.orderProperty)};
    });

  }]);

angular.module("parties").controller("PartyDetailsCtrl", [
  '$scope',
  '$stateParams',
  '$meteor',
  '$state',
  '$mdToast',
  function ($scope, $stateParams, $meteor, $state, $mdToast) {
    //$scope.party = $meteor.object(Parties, $stateParams.partyId, false);

    $meteor.subscribe('partyDetail', $stateParams.partyId).then(function () {
      $scope.party = Parties.findOne($stateParams.partyId);
      if (!_.isArray($scope.party.emails)) {
        $scope.party.emails = [];
      }
    });


    $scope.updateParty = function (updateParty) {
      //var isValid = validateSchemaContext(Schemas.PartyFormUpdateSchema, updateParty, this.partyForm);
      //if (isValid) {
      //console.log(updateParty)
      $meteor.call("updateParty", updateParty).then(function (result) {
        console.error("success", result)
      }, function (error) {
        $mdToast.show($mdToast.simple().content(error.message).position('top right'));
      });


    }

  }]);