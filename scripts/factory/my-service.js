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
  
