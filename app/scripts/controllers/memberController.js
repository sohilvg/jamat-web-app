'use strict';

angular.module('sbAdminApp')
	.controller('MemberCtrl', ['$scope', '$timeout', '$http', '$state', function ($scope, $timeout, $http, $state) {
		$scope.getJamats = function () {
			$http({ url: 'http://localhost:3000/jamat' }).then(function (successResponse) {
				$scope.jamats = successResponse.data;
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});
		};

		$scope.newmember = {
			rown: 'Yes',
			bown: 'Yes',
			gender: 'M',
			bstate: 'Goa'
		};

		$scope.addMember = function (newMember) {

			$http({ url: 'http://localhost:3000/member', method: 'POST', data: newMember }).then(function (successResponse) {
				$state.go('dashboard.viewmember');
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});

		};

		$scope.getCity = function () {
			$http({ url: 'http://localhost:3000/city' }).then(function (successResponse) {
				$scope.cities = successResponse.data;
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});
		};

		$scope.getState = function () {
			$http({ url: 'http://localhost:3000/state' }).then(function (successResponse) {
				$scope.states = successResponse.data;
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});
		};

		$scope.getDistricts = function () {
			$http({ url: 'http://localhost:3000/district' }).then(function (successResponse) {
				$scope.districts = successResponse.data;
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});
		};
		$scope.getJamats();
		$scope.getDistricts();
		$scope.getState();
		$scope.getCity();
	}]);