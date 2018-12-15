'use strict';


angular.module('sbAdminApp')
	.controller('viewmemberCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

		$scope.getviewmembers = function () {
			$http({ url: 'http://localhost:3000/viewmember' }).then(function (successResponse) {
				$scope.viewmembers = successResponse.data;
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});
		};

		$scope.newviewmember = {
			city: '',
			name: '',
			state: ''
		};

		$scope.addJamat = function (newViewmember) {

			$http({ url: 'http://localhost:3000/viewmember', method: 'POST', data: newViewmember }).then(function (successResponse) {
				$scope.getviewmembers();
				return successResponse;
			}, function (errorResponse) {
				return errorResponse
			});

		};
		$scope.getviewmembers();
	}]);