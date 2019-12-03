angular.module('services', [])
.controller('operations', function($scope, $http) {
    
    $scope.calculate = function() {

        $http.get("http://localhost:3000/sum/"+$scope.number1+"/"+$scope.number2)
		.then(function(response) {
            $scope.sum = response.data;
        });
	
        $http.get("http://localhost:3000/subtraction/"+$scope.number1+"/"+$scope.number2)
		.then(function(response) {
            $scope.subtraction = response.data;
        });
		
	    $http.get("http://localhost:3000/multiplication/"+$scope.number1+"/"+$scope.number2)
		.then(function(response) {
            $scope.multiplication = response.data;
        });
		
	    $http.get("http://localhost:3000/division/"+$scope.number1+"/"+$scope.number2)
		.then(function(response) {
            $scope.division = response.data;
        });
    }
    
    $scope.calculate();
});
