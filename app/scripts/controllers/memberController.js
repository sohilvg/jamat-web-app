"use strict";

angular.module("sbAdminApp").controller("MemberCtrl", [
  "$scope",
  "$timeout",
  "$http",
  "$state",
  function ($scope, $timeout, $http, $state) {
    $scope.getJamats = function () {
      $http({
        url: "http://localhost:3000/jamat"
      }).then(
        function (successResponse) {
          $scope.jamats = successResponse.data;
          return successResponse;
        },
        function (errorResponse) {
          return errorResponse;
        }
      );
    };

    $scope.newmember = {
      rown: "Yes",
      bown: "Yes",
      gender: "M",
      bstate: "Goa",
      sex: "M"
      // blood_group: 'AB+'
    };

    $scope.addMember = function (newMember) {
      $http({
        url: "http://localhost:3000/member",
        method: "POST",
        data: newMember
      }).then(
        function (successResponse) {
          $state.go("dashboard.viewmember");
          return successResponse;
        },
        function (errorResponse) {
          return errorResponse;
        }
      );
    };

    $scope.getCity = function () {
      $http({
        url: "http://localhost:3000/city"
      }).then(
        function (successResponse) {
          $scope.cities = successResponse.data;
          return successResponse;
        },
        function (errorResponse) {
          return errorResponse;
        }
      );
    };

    $scope.getState = function () {
      $http({
        url: "http://localhost:3000/state"
      }).then(
        function (successResponse) {
          $scope.states = successResponse.data;
          return successResponse;
        },
        function (errorResponse) {
          return errorResponse;
        }
      );
    };

    $scope.getDistricts = function () {
      $http({
        url: "http://localhost:3000/district"
      }).then(
        function (successResponse) {
          $scope.districts = successResponse.data;
          return successResponse;
        },
        function (errorResponse) {
          return errorResponse;
        }
      );
    };
    $scope.myNumber = 1;
    $scope.range = function (count) {
      var output = [];
      for (var i = 0; i < count; i++) {
        output.push({
          name:"",
          age:"",
          sex:"",
          contact:"",
          qualification:""
        })
      };
      return output;
    };
    // $scope.getFmembers = function () {
    // 	$http({ url: 'http://localhost:3000/family_members' }).then(function (successResponse) {
    // 		$scope.family_members = successResponse.data;
    // 		return successResponse;
    // 	}, function (errorResponse) {
    // 		return errorResponse
    // 	});
    // };

    $scope.getJamats();
    $scope.getDistricts();
    $scope.getState();
    $scope.getCity();
    // $scope.getFmembers();
    // Code goes here
  }
]);
// var app = angular.module("sbAdminApp", []);
// app.controller("MemberCtrl", function ($scope) {
//   $scope.myNumber = 1;
//   $scope.range = function (count) {
//     var output = [];
//     for (var i = 0; i < count; i++) {
//       output.push(i)
//     };
//     return output;
//   }
// });