"use strict";

angular.module("AIMJF").controller("MemberCtrl", [
  "$scope",
  "$timeout",
  "$http",
  "$state",
  function ($scope, $timeout, $http, $state) {
    $scope.getJamats = function () {
      $http({
        url: "http://localhost:3000/api/v1/jamat"
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
      rown: "",
      bown: "",
      gender: "",
      sex: ""
      // blood_group: 'AB+'
    };

    $scope.addMember = function (newMember) {
      $http({
        url: "http://localhost:3000/api/v1/member",
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
        url: "http://localhost:3000/api/v1/city"
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
        url: "http://localhost:3000/api/v1/states"
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
        url: "http://localhost:3000/api/v1/district"
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
          name: "",
          age: "",
          sex: "",
          contact: "",
          f_blood_group: "",
          qualification: ""
        })
      };
      return output;
    };
    $scope.getJamats();
    $scope.getDistricts();
    $scope.getState();
    $scope.getCity();

  }
]);