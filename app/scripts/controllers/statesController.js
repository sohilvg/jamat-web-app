'use strict';
angular.module('AIMJF')
	.controller('StatesCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
		$scope.getState = function () {
			$http({
				url: 'http://localhost:3000/api/v1/states'
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
				url: 'http://localhost:3000/api/v1/states',
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

		// For delete state//

		$scope.deleteStates = function(name){				
			var index = -1;		
			var comArr = eval( $scope.states );
			for( var i = 0; i < comArr.length; i++ ) {
				if( comArr[i].name === name ) {
					index = i;
					break;
				}
			}
			if( index === -1 ) {
				alert( "Something gone wrong" );
			}
			$scope.states.splice( index, 1 );		
		};
		$scope.deleteStates={
            id:''
        };
        $scope.deleteStates = function (id) {
            $http({ url: `http://localhost:3000/api/v1/states/${id}`, method: 'DELETE', data: id }).then(function (successResponse) {
                // $scope.zones = successResponse.data;
                $scope.getState();
                return successResponse;
            }, function (errorResponse) {
                return errorResponse
            });
        };
	}]);