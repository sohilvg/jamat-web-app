'use strict';


angular.module('sbAdminApp')
	.controller('JamatCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

		$scope.getJamats = function () {
			$http({ url: 'http://localhost:3000/jamat' }).then(function (successResponse) {
				$scope.jamats = successResponse.data;
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});
		};

		$scope.newJamat = {
			city: '',
			name: '',
			state: ''
		};

		$scope.addJamat = function (newJamat) {

			$http({ url: 'http://localhost:3000/jamat', method: 'POST', data: newJamat }).then(function (successResponse) {
				$scope.getJamats();
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});

		};
		$scope.getJamats();
	}]);