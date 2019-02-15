'use strict';

angular.module('sbAdminApp')
    .controller('JamatidCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
        $scope.getJamatids = function () {
            $http({ url: 'http://localhost:3000/jamatid' }).then(function (successResponse) {
                $scope.zones = successResponse.data;
                return successResponse;
            }, function (errorResponse) {
                return errorResponse
            });
        };
        $scope.newZone = {
            name: '',
            code: ''
        };

        $scope.getCode = function () {
            $http({ url: 'http://localhost:3000/code' }).then(function (successResponse) {
                $scope.codes = successResponse.data;
                return successResponse;
            }, function (errorResponse) {
                return errorResponse
            });
        };


        // $scope.getCode();

    }]);