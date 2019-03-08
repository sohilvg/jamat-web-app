'use strict';
angular.module('sbAdminApp')
	.controller('StatesCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
		$scope.getState = function () {
			$http({
				url: 'http://localhost:3000/states'
			}).then(function (successResponse) {
				$scope.states = successResponse.data;
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});
		};
		$scope.update_state = {
			state_code: '',
			state: ''
		};
		$scope.addstates = function (update_state) {
			$http({
				url: 'http://localhost:3000/states',
				method: 'POST',
				data: update_state
			}).then(function (successResponse) {
				$scope.getState();
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});
		};
		$scope.getState();
	}]);