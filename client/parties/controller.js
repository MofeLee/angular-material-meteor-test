angular.module("parties").controller("PartiesListCtrl", ['$scope', '$meteor', '$rootScope',
  function ($scope, $meteor, $rootScope) {

    $scope.page = 1;
    $scope.perPage = 3;
    $scope.sort = {name: 1};
    $scope.orderProperty = '1';

    $scope.parties = $meteor.collection(function () {
      return Parties.find({}, {
        sort: $scope.getReactively('sort')
      });
    });

    var subscriptionHandle;


    $meteor.autorun($scope, function () {

      $meteor.subscribe('parties', {
        limit: parseInt($scope.getReactively('perPage')),
        skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
      }, $scope.getReactively('search')).then(function (handle) {
        subscriptionHandle = handle;
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
      party.owner = $rootScope.currentUser._id;
      var self = this;
      //$scope.parties.push(party);
      $meteor.call("insertParty", party).then(function (data) {
        self.newParty = {};
        // not working 100%
        self.partyForm.$setUntouched();
        self.partyForm.$setPristine();
      }, function (error) {
        console.log(error)
      });

      //$scope.newParty = {};
      //$scope.partyForm.$setValidity();
      //$scope.partyForm.$setPristine();
    };

    $scope.pageChanged = function (newPage) {
      $scope.page = newPage;
    };


    $scope.$watch('orderProperty', function () {
      if ($scope.orderProperty)
        $scope.sort = {name: parseInt($scope.orderProperty)};
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