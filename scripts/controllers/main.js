
/**
 * @ngdoc function
 * @name proappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proappApp
 */

 // APPLICATION MAIN CONTROLLER 

angular.module('proappApp')
.controller('MainController', ['$scope', '$http', '$q', '$timeout', '$interval', 'uiGridConstants', 'myService', 'dataService', 'addService', function ($scope, $http, $q, $timeout, $interval, uiGridConstants, myService, dataService, addService) {
  
  // ui grid settings
  $scope.gridOptions = {
    enableRowSelection: true,
    selectionRowHeaderWidth: 35,
    rowHeight: 50,
    showGridFooter:true
  };
  
  $scope.gridOptions = {
    paginationPageSizes: [5, 10, 15],
    paginationPageSize: 10, 
    enableFiltering: true 
  };

  $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
    if( col.filters[0].term ){
      return 'header-filtered';
    } else {
      return '';
    }
  };

  // ui grid data load from json file in data folder 

  $http.get('../data/employees.json')
    .then(function(response) {
      $scope.gridOptions.data = response.data;
      response.data.forEach( function addDates( row, index ){
        row.gender = row.gender === 'male' ? '1' : '2';
      });
  
      /* since angular clien-side we update table temporarily but if we have server-side, we just update 
        external datastore, json or database and load the data. In this case edit function updated current grid temporarily
      */
    
      (function() {
        var id = dataService.get().id;
        var data  = dataService.get();
        if(id != undefined){
        var myGridData = $scope.gridOptions.data; 
          myGridData.forEach(function editRow(row, index){
            if(id == row.id) {
              row.name = data.name;
              row.gender = data.gender;
              row.address = data.address;
              row.company = data.company;
              row.email = data.email;
              row.phone = data.phone;
              row.age = data.age;
            }
            else{};    
          })
          $scope.gridOptions.data = myGridData;
        }
      }());
    
    
      /* since angular clien-side we update table temporarily but if we have server-side, we just update 
        external datastore, json or database and load the data. In this case edit function updated current grid temporarily
      */
        (function() {
        var id = addService.get().id;
        var data  = addService.get();
        if(id!=undefined) {
          $scope.gridOptions.data.push({
            "id"          : data.id,
            "name"        : data.name,
            "gender"      : data.gender,
            "address"     : data.address,  
            "company"     : data.company,
            "email"       : data.email,
            "phone"       : data.phone,
            "age"         : data.age
          });
        }
      }());  
    });

    // ui grid filter settings 

    $scope.gridOptions.columnDefs = [
      { field: 'id',    name: 'id', enableFiltering: true, allowCellFocus : false},
      { field: 'name', enableCellEdit: true,  headerCellClass: $scope.highlightFilteredHeader, allowCellFocus : false },
      { field: 'gender', allowCellFocus : false,  filter: {
        type: uiGridConstants.filter.SELECT,
        selectOptions: [ { value: '1', label: 'male' }, { value: '2', label: 'female' }, { value: '3', label: 'unknown'}, { value: '4', label: 'not stated' }, { value: '5', label: 'a really long value that extends things' } ]
      },
      cellFilter: 'mapGender', headerCellClass: $scope.highlightFilteredHeader },
      { field: 'address', name: 'address', allowCellFocus : false},
      { field: 'company', enableCellEdit: true,  headerCellClass: $scope.highlightFilteredHeader, allowCellFocus : false },
      { field: 'email', allowCellFocus : false,  filter: {
            condition: uiGridConstants.filter.ENDS_WITH,
            placeholder: 'ends with'
          }, headerCellClass: $scope.highlightFilteredHeader
      },
      {
        field: 'phone', allowCellFocus : false, filter: {
            condition: function(searchTerm, cellValue) {
              var strippedValue = (cellValue + '').replace(/[^\d]/g, '');
              return strippedValue.indexOf(searchTerm) >= 0;
            }
          }, headerCellClass: $scope.highlightFilteredHeader
        },
        // multiple filters
        { field: 'age', allowCellFocus : false, filters: [
          {
            condition: uiGridConstants.filter.GREATER_THAN,
            placeholder: 'greater than'
          },
          {
            condition: uiGridConstants.filter.LESS_THAN,
            placeholder: 'less than'
          }
        ], headerCellClass: $scope.highlightFilteredHeader}  
      ];
  
    // selecting particular for edit functionality using service

    $scope.getSelectedRows = function() {
      $scope.mySelectedRows = $scope.gridApi.selection.getSelectedRows();
      myService.set($scope.mySelectedRows);
    };

    $scope.gridOptions.onRegisterApi = function(gridApi){
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(rows){
      });
      gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
      });
    };

    $scope.gridOptions.multiSelect = false;
    $scope.gridOptions.modifierKeysToMultiSelect = false;
    $scope.gridOptions.noUnselect = true;
  
    // ui grid toogle filtering function

    $scope.toggleFiltering = function(){
      $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
      $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
    };

    // ui grid edit row functionality without rendering edi component
    $scope.saveRow = function( rowEntity ) {
        var promise = $q.defer();
        $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );
      
        $interval( function() {
          if (rowEntity.gender === 'male' ){
            promise.reject();
          } else {
            promise.resolve();
          }
        }, 3000, 1);
        };
  
    $scope.gridOptions.onRegisterApi = function(gridApi){
      $scope.gridApi = gridApi;
      gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    };
}]);  


