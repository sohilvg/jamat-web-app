'use strict';


angular.module('sbAdminApp')
	.controller('CitiesCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
		console.log('hello hello');
		$scope.getCity = function () {
			$http({ url: 'http://localhost:3000/city' }).then(function (successResponse) {
				$scope.cities = successResponse.data;
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});
		};

		$scope.update_city = {
			city_code: '',
			city: ''
		};
		$scope.addcities = function (update_city) {

			$http({ url: 'http://localhost:3000/city', method: 'POST', data: update_city }).then(function (successResponse) {
				$scope.getCity();
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});

		};


		$scope.getCity();

	}]);