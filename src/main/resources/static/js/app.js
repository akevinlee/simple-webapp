var locationManagerModule = angular.module('locationManagerApp', ['ngAnimate']);

locationManagerModule.controller('locationManagerController', function ($scope,$http) {

    var urlBase="";
    $scope.toggle=true;
    $scope.selection = [];
    //$scope.statuses=['ACTIVE','COMPLETED'];
    //$scope.priorities=['HIGH','LOW','MEDIUM'];
    $http.defaults.headers.post["Content-Type"] = "application/json";

    function findAllLocations() {
        //get all locations
        $http.get(urlBase + '/locations').
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.locations = data._embedded.locations;
                } else {
                    $scope.locations = [];
                }
                /*for (var i = 0; i < $scope.locations.length; i++) {
                    if ($scope.tasks[i].taskStatus == 'COMPLETED') {
                        $scope.selection.push($scope.tasks[i].taskId);
                    }
                }*/
                $scope.locationId="";
                $scope.locationName="";
                $scope.locationAddress="";
                $scope.locationCity="";
                $scope.locationZip="";
                $scope.locationState="";
                $scope.locationCountry="";
                $scope.locationPrice="";
                $scope.locationCurrency="";
                $scope.toggle='!toggle';
            });
    }

    findAllLocations();

    //add a new location
    $scope.addLocation = function addLocation() {
        if($scope.locationName=="" || $scope.locationAddress=="" || $scope.locationCity == "" || $scope.locationZip == ""
            || $scope.locationState=="" || $scope.locationCountry=="" || $scope.locationPrice=="" || $scope.locationCurrency==""){
            alert("Insufficient Data! Please enter values for all fields");
        }
        else{
            $http.post(urlBase + '/locations', {
                locationName: $scope.locationName,
                locationAddress: $scope.locationAddress,
                locationCity: $scope.locationCity,
                locationZip: $scope.locationZip,
                locationState: $scope.locationState,
                locationCountry: $scope.locationCountry,
                locationPrice: $scope.locationPrice,
                locationCurrency: $scope.locationCurrency
            }).
                success(function(data, status, headers) {
                    alert("Location added");
                    var newLocationUri = headers()["location"];
                    console.log("Might be good to GET " + newLocationUri + " and append the location.");
                    // Refetching EVERYTHING every time can get expensive over time
                    // Better solution would be to $http.get(headers()["location"]) and add it to the list
                    findAllLocations();
                });
        }
    };

    /*// toggle selection for a given location by location id
    $scope.toggleSelection = function toggleSelection(locationUri) {
        var idx = $scope.selection.indexOf(locationUri);

        // is currently selected
        // HTTP PATCH to ACTIVE state
        if (idx > -1) {
            $http.patch(locationUri, { taskStatus: 'ACTIVE' }).
                success(function(data) {
                    alert("Task unmarked");
                    findAllLocations();
                });
            $scope.selection.splice(idx, 1);
        }

        // is newly selected
        // HTTP PATCH to COMPLETED state
        else {
            $http.patch(locationUri, { taskStatus: 'COMPLETED' }).
                success(function(data) {
                    alert("location marked completed");
                    findAllLocations();
                });
            $scope.selection.push(locationUri);
        }
    };*/

});

//Angularjs Directive for confirm dialog box
locationManagerModule.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction);
                    }
                });
            }
        };
    }]);