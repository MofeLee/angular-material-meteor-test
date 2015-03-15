angular.module("parties").controller("PartiesListCtrl", ['$scope', '$meteor', '$rootScope', '$mdToast', "$q",
  function ($scope, $meteor, $rootScope, $mdToast, $q) {

    $scope.search =  {
      page : 1,
      perPage : 3,
      sort : {name: 1},
      orderProperty : '1',
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
      subscriptionHandle.stop();
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
      if(!valContext.validate(party)){

        var invalidKeys = valContext.invalidKeys();
        $scope.invalidKeys = invalidKeys;


        invalidKeys.forEach(function(field){

          console.log("field", field);
          var formField = self.partyForm[field.name];
          if(formField){
            //debugger;
            formField.$setValidity(field.type, false);
            //self.partyForm.$setInvalid();
          }else {
            console.log("cannot set invalid state for %s", field.name );
          }

        });


      }else {


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
  function ($scope, $stateParams, $meteor, $state) {
    $scope.party = $meteor.object(Parties, $stateParams.partyId);

    $scope.updateParty = function (party) {
      party.save().then(function (numberOfDocs) {
        $state.go('parties');
      }, function (err) {
        console.log("update error", err);
      });
    }

  }]);