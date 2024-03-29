angular.module('services', [])
.controller('operations', function($scope, $http) {
    
    $scope.calculate = function() {

        $http.get("http://SUM_SERVICE_IP:SUM_SERVICE_PORT/sum/"+$scope.number1+"/"+$scope.number2)
		.then(function(response) {
            $scope.sum = response.data;
        });
	
        $http.get("http://SUBTRACTION_SERVICE_IP:SUBTRACTION_SERVICE_PORT/subtraction/"+$scope.number1+"/"+$scope.number2)
		.then(function(response) {
            $scope.subtraction = response.data;
        });
		
	    $http.get("http://MULTIPLICATION_SERVICE_IP:MULTIPLICATION_SERVICE_PORT/multiplication/"+$scope.number1+"/"+$scope.number2)
		.then(function(response) {
            $scope.multiplication = response.data;
        });
		
	    $http.get("http://DIVISION_SERVICE_IP:DIVISION_SERVICE_PORT/division/"+$scope.number1+"/"+$scope.number2)
		.then(function(response) {
            $scope.division = response.data;
        });
    }
    
    $scope.calculate();
});
