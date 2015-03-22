
var colors = [
  'Red',
  'Green',
  'Blue',
  'Yellow',
  'Submarine'
];


angular.module("training").controller("TrainingFormInsertCtrl", [
  '$scope',
  '$stateParams',
  '$meteor',
  '$state',
  '$mdToast',
  function ($scope, $stateParams, $meteor, $state, $mdToast) {
    //$scope.party = $meteor.object(Parties, $stateParams.partyId, false);

    $scope.insertUpdateTraining = function (trainingDoc) {

      $meteor.call("insertTraining", trainingDoc).then(function (result) {
        console.log(result)
        if (_.isString(result)) {
          $state.go('trainingUpdate', {_id: result});
        } else {
          $mdToast.show($mdToast.simple().content("Result is not a string!").position('top right'));
        }
      }, function (error) {
        console.error(error)
        $mdToast.show($mdToast.simple().content(error.message).position('top right'));
      });
    }

    $scope.availableColors = colors;


  }]);


angular.module("training").controller("TrainingFormUpdateCtrl", [
  '$scope',
  '$stateParams',
  '$meteor',
  '$state',
  '$mdToast',
  function ($scope, $stateParams, $meteor, $state, $mdToast) {
    //$scope.party = $meteor.object(Parties, $stateParams.partyId, false);


    var trainingIdParams = $stateParams._id;
    $meteor.subscribe('trainingDetail', trainingIdParams).then(function () {
      $scope.training = Training.findOne(trainingIdParams);

    });


    $scope.insertUpdateTraining = function (trainingDoc) {
      //var isValid = validateSchemaContext(Schemas.PartyFormUpdateSchema, updateParty, this.partyForm);
      //if (isValid) {
      //console.log(updateParty)
      $meteor.call("updateTraining", trainingDoc).then(function (result) {
        console.error("success", result)
      }, function (error) {
        $mdToast.show($mdToast.simple().content(error.message).position('top right'));
      });
    }


    $scope.availableStates = [
      {value: 'one', label: 'One'},
      {value: 'two', label: 'Two'},
      {value: 'three', label: 'Drei'},
      {value: 'four', label: 'View'}
    ];

    $scope.availableColors = colors;


  }]);