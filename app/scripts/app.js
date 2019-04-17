"use strict";
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular.module('Authentication', []);

angular
  .module("sbAdminApp", [
    "oc.lazyLoad",
    "ui.router",
    "ui.bootstrap",
    "angular-loading-bar",
    "Authentication"
  ])
  .config([
    "$stateProvider",
    "$urlRouterProvider",
    "$ocLazyLoadProvider",
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
      $ocLazyLoadProvider.config({
        debug: false,
        events: true
      });

      $urlRouterProvider.otherwise("/dashboard/home");

      $stateProvider
        .state("dashboard", {
          url: "/dashboard",
          templateUrl: "views/dashboard/main.html",
          resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
              return (
                $ocLazyLoad.load({
                  name: "sbAdminApp",
                  files: [
                    "scripts/directives/header/header.js",
                    "scripts/directives/header/header-notification/header-notification.js",
                    "scripts/directives/sidebar/sidebar.js",
                    "scripts/directives/sidebar/sidebar-search/sidebar-search.js"
                  ]
                }),
                $ocLazyLoad.load({
                  name: "toggle-switch",
                  files: [
                    "bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                    "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                  ]
                }),
                $ocLazyLoad.load({
                  name: "ngAnimate",
                  files: ["bower_components/angular-animate/angular-animate.js"]
                })
              );
              $ocLazyLoad.load({
                name: "ngCookies",
                files: ["bower_components/angular-cookies/angular-cookies.js"]
              });
              $ocLazyLoad.load({
                name: "ngResource",
                files: ["bower_components/angular-resource/angular-resource.js"]
              });
              $ocLazyLoad.load({
                name: "ngSanitize",
                files: ["bower_components/angular-sanitize/angular-sanitize.js"]
              });
              $ocLazyLoad.load({
                name: "ngTouch",
                files: ["bower_components/angular-touch/angular-touch.js"]
              });
            }
          }
        })
        .state("dashboard.home", {
          url: "/home",
          controller: "MainCtrl",
          templateUrl: "views/dashboard/home.html",
          resolve: {
            loadMyFiles: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "sbAdminApp",
                files: [
                  "scripts/controllers/main.js",
                  "scripts/directives/timeline/timeline.js",
                  "scripts/directives/notifications/notifications.js",
                  "scripts/directives/chat/chat.js",
                  "scripts/directives/dashboard/stats/stats.js"
                ]
              });
            }
          }
        })
        .state("dashboard.form", {
          templateUrl: "views/form.html",
          url: "/form"
        })
        .state("dashboard.blank", {
          templateUrl: "views/pages/blank.html",
          url: "/blank"
        })
        .state("login", {
          templateUrl: "views/pages/login.html",
          url: "/login",
          controller: "LoginCtrl",
          controllerAs: 'vm',
          resolve: {
            loadMyFile: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "sbAdminApp",
                files: ["scripts/controllers/loginController.js"]
              });
            }
          }
        })
        .state("signup", {
          templateUrl: "views/pages/signup.html",
          url: "/signup",
          controller: "SignupCtrl",
          controllerAs: 'vm',
          resolve: {
            loadMyFile: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "sbAdminApp",
                files: ["scripts/controllers/signupController.js"]
              });
            }
          }
        })
        .state("dashboard.member", {
          templateUrl: "views/member.html",
          url: "/member",
          controller: "MemberCtrl",
          resolve: {
            loadMyFile: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "sbAdminApp",
                files: ["scripts/controllers/memberController.js"]
              });
            }
          }
        })
        .state("dashboard.viewmember", {
          templateUrl: "views/viewmember.html",
          url: "/viewmember",
          controller: "ViewmemberCtrl",
          resolve: {
            loadMyFile: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "sbAdminApp",
                files: ["scripts/controllers/viewmemberController.js"]
              });
            }
          }
        })
        .state("dashboard.jamat", {
          templateUrl: "views/jamat.html",
          controller: "JamatCtrl",
          url: "/jamat",
          resolve: {
            loadMyFile: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "sbAdminApp",
                files: ["scripts/controllers/jamatController.js"]
              });
            }
          }
        })
        .state("dashboard.states", {
          templateUrl: "views/states.html",
          controller: "StatesCtrl",
          url: "/states",
          resolve: {
            loadMyFile: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "sbAdminApp",
                files: ["scripts/controllers/statesController.js"]
              });
            }
          }
        })
        .state("dashboard.cities", {
          templateUrl: "views/cities.html",
          controller: "CitiesCtrl",
          url: "/cities",
          resolve: {
            loadMyFile: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "sbAdminApp",
                files: ["scripts/controllers/citiesController.js"]
              });
            }
          }
        })
        .state("dashboard.zone", {
          templateUrl: "views/zone.html",
          controller: "ZoneCtrl",
          url: "/zone",
          resolve: {
            loadMyFile: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "sbAdminApp",
                files: ["scripts/controllers/zoneController.js"]
              });
            }
          }
        })

      // .state('dashboard.member', {
      //   templateUrl: 'views/member.html',
      //   controller: 'FmembersCtrl',
      //   url: '/member',
      //   resolve: {
      //     loadMyFile: function ($ocLazyLoad) {
      //       return $ocLazyLoad.load({
      //         name: 'sbAdminApp',
      //         files: ['scripts/controllers/FmembersController.js']
      //       })
      //     }
      //   }
      // });

    }

  ]);
(function () {
  'use strict';

  angular
    .module('app', ['ngRoute', 'ngCookies'])
    .config(config)
    .run(run);

  config.$inject = ['$routeProvider', '$locationProvider'];
  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'HomeController',
        templateUrl: 'home/home.view.html',
        controllerAs: 'vm'
      })

      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'login/login.view.html',
        controllerAs: 'vm'
      })

      .when('/register', {
        controller: 'RegisterController',
        templateUrl: 'register/register.view.html',
        controllerAs: 'vm'
      })

      .otherwise({ redirectTo: '/login' });
  }

  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
  function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
      var loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
        $location.path('/login');
      }
    });
  }

})();
