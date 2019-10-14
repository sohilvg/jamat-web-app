'use strict';


angular.module('AIMJF')
	.controller('CitiesCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
		$scope.getCity = function () {
			$http({
				url: 'http://localhost:3000/api/v1/city'
			}).then(function (successResponse) {
				$scope.cities = successResponse.data;
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});
		};

		$scope.newCities = {
			city: '',
			city_code: ''

		};
		$scope.addcities = function (newCities) {

			$http({
				url: 'http://localhost:3000/api/v1/cities',
				method: 'POST',
				data: newCities
			}).then(function (successResponse) {
				$scope.getCity();
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});

		};
		$scope.getCity();

		$scope.deleteCities={
            id:''
        };
        $scope.deleteCities = function (id) {
            $http({ url: `http://localhost:3000/api/v1/cities/${id}`, method: 'DELETE', data: id }).then(function (successResponse) {
                // $scope.zones = successResponse.data;
                $scope.getCity();
                return successResponse;
            }, function (errorResponse) {
                return errorResponse
            });
        };

	}]);