'use strict';

angular.module('sbAdminApp')
    .controller('ZoneCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

        $scope.getZones = function () {
            $http({ url: 'http://localhost:3000/zone' }).then(function (successResponse) {
                $scope.zones = successResponse.data;
                return successResponse;
            }, function (errorResponse) {
                return errorResponse
            });
        };
        $scope.newZone = {
            name: '',
            zcode: ''
        };



        $scope.addZone = function (newZone) {

            $http({ url: 'http://localhost:3000/zone', method: 'POST', data: newZone }).then(function (successResponse) {
                $scope.getZones();
                return successResponse;
            }, function (errorResponse) {
                return errorResponse
            });
        };
        $scope.getZones();
        // $scope.getCode();

    }]);