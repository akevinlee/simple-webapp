var locationManagerModule = angular.module('locationManagerApp', ['ngAnimate']);

locationManagerModule.controller('locationManagerController', function ($scope,$http,$location) {

    //var urlBase=getBaseUrl() + "/simple-webapp";
    var urlBase=getBaseUrl();
    $scope.toggle=true;
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

    //load a location
    $scope.loadLocation = function loadLocation(locationUri) {
        if (locationUri) {
            //get specific location
            $http.get(locationUri).
                success(function (data) {
                    if (data.name != undefined) {
                        $scope.locationUri = locationUri;
                        $scope.locationName = data.name;
                        $scope.locationAddress = data.address;
                        $scope.locationCity = data.city;
                        $scope.locationZip = data.zip;
                        $scope.locationState = data.state;
                        $scope.locationCountry = data.country;
                        $scope.locationPrice = data.price;
                        $scope.locationCurrency = data.currency;
                    } else {
                        alert("Location not found: " + locationUri);
                    }
                });
        } else {
            $scope.locationId="";
            $scope.locationName="";
            $scope.locationAddress="";
            $scope.locationCity="";
            $scope.locationZip="";
            $scope.locationState="";
            $scope.locationCountry="";
            $scope.locationPrice="";
            $scope.locationCurrency="";
        }
        $scope.toggle = !$scope.toggle;
    };

    //add or edit a new location
    $scope.saveLocation = function saveLocation(locationUri) {
        if($scope.locationName=="" || $scope.locationAddress=="" || $scope.locationCity == "" || $scope.locationZip == ""
            || $scope.locationState=="" || $scope.locationCountry=="" || $scope.locationPrice=="" || $scope.locationCurrency==""){
            alert("Insufficient Data! Please enter values for all fields");
        }
        else{
            if (locationUri) {
                // update a location
                $http.patch(locationUri, {
                    name: $scope.locationName,
                    address: $scope.locationAddress,
                    city: $scope.locationCity,
                    zip: $scope.locationZip,
                    state: $scope.locationState,
                    country: $scope.locationCountry,
                    price: $scope.locationPrice,
                    currency: $scope.locationCurrency
                }).
                    success(function(data) {
                        alert("Location updated");
                        findAllLocations();
                    });
            } else {
                // add a new location
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
                    success(function (data, status, headers) {
                        alert("Location added");
                        var newLocationUri = headers()["location"];
                        console.log("Might be good to GET " + newLocationUri + " and append the location.");
                        // Refetching EVERYTHING every time can get expensive over time
                        // Better solution would be to $http.get(headers()["location"]) and add it to the list
                        findAllLocations();
                    });
            }
        }
    };

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

function getBaseUrl () {
    var url = location.href;  // entire url including querystring - also: window.location.href;
    var baseURL = url.substring(0, url.indexOf('/', 14));

    if (baseURL.indexOf('http://localhost') != -1) {
        // Base Url for localhost
        var url = location.href;  // window.location.href;
        var pathname = location.pathname;  // window.location.pathname;
        var index1 = url.indexOf(pathname);
        var index2 = url.indexOf("/", index1 + 1);
        var baseLocalUrl = url.substr(0, index2);
        return baseLocalUrl;
    }
    else {
        // Root Url for domain name
        return baseURL;
    }
};
