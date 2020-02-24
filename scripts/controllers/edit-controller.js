var app = angular.module('proappApp');
// EDIT CONTROLLER
app.controller('EditController', ['$scope', 'myService', 'dataService', '$location', function ($scope, myService, dataService, $location) {
    $scope.myData = myService.get();
    $scope.editEmployeeAction = function(field) {
        dataService.set(field);
    };
    
    $scope.back = function() {
      $location.path('/');
    }
  }]);