'use strict';


angular.module('sbAdminApp')
	.controller('ViewmemberCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

		$scope.getMembers = function () {
			$http({ url: 'http://localhost:3000/member' }).then(function (successResponse) {
				$scope.members = successResponse.data;
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});
		};



		$scope.getJamats = function () {
			$http({ url: 'http://localhost:3000/jamat' }).then(function (successResponse) {
				$scope.jamats = successResponse.data;
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});
		};
		// $scope.getViewmembers();
		$scope.getJamats();
		$scope.getMembers();


	}]);

	