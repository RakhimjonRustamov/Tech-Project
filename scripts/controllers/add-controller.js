var app = angular.module('proappApp');
// ADD CONTROLLER
app.controller('AddController', ['$scope', 'addService', '$location', function ($scope, addService, $location) {
    $scope.addEmployeeAction = function(field) {
      addService.set(field);
    };
  
    $scope.back = function() {
      $location.path('/');
    }
  
  }]);