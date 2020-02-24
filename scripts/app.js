
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





