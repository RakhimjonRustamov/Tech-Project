
/**
 * @ngdoc overview
 * @name proappApp
 * @description
 * # proappApp
 *
 * Main module of the application.
 */
 var app = angular
  .module('proappApp', [
    'ngAnimate',
    'ngRoute', 
    'ngTouch',
    'ui.grid', 
    'ui.grid.edit', 
    'ui.grid.rowEdit', 
    'ui.grid.pagination', 
    'ui.grid.selection', 
    'ui.grid.cellNav',
  ])
  .filter('mapGender', mapGender)
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/edit', {templateUrl: 'views/edit.html', controller: 'EditController'})
      .when('/add', {templateUrl: 'views/add.html', controller: 'AddController'})
      .otherwise({
        redirectTo: '/'
      });
  });

   // APPLICATION UTILITY FUNCTIONS

   function mapGender() {
    var genderHash = {
      1: 'male',
      2: 'female'
    };
   
    return function(input) {
      if (!input){
        return '';
      } else {
        return genderHash[input];
      }
    };
  } 






var app = angular.module('proappApp');

// APPLICAION SERVICES
app.factory('myService', function($location) {
    var savedData = {}
    function set(data) {
      savedData = data;
      $location.path('/edit');
    }
  
    function get() { return savedData; }
     
    return { set: set, get: get } 
   });
  
  
  app.factory('dataService', function($location) {
    var savedData = {}
    function set(data) {
      savedData = data;
      $location.path('/');
    }
  
    function get() { return savedData; }
   
    return { set: set, get: get } 
   });
  
   app.factory('addService', function($location) {
    var savedData = {}
    function set(data) {
      savedData = data;
      $location.path('/');
    }
  
    function get() { return savedData; }
  
    return { set: set, get: get } 
});
  

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