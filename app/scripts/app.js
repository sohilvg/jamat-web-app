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
const app = angular.module('app', ['ui.router']);

app.service('session', function($timeout, $q){
  this.role = null;

  this.loadRole = function(){
      //load role using axax request and return promise
  };
});
app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateProvider: function(session, $stateParams, $templateFactory){
        return session.loadRole().then(function(role){
            if(session.role == 'admin'){
              return $templateFactory.fromUrl('/admin/dashboard.html', $stateParams);
            } else {
              return $templateFactory.fromUrl('/user/dashboard.html', $stateParams);
            }
        });
      }
    });

  $urlRouterProvider.otherwise('/dashboard');
});

//With role base//
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

      $urlRouterProvider.otherwise("login");

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
          templateProvider: function(session, $stateParams, $templateFactory){
            return session.loadRole().then(function(role){
                if(session.role == 'admin'){
                  return $templateFactory.fromUrl("views/admin/dashboard/home.html", $stateParams);
                } else {
                  return $templateFactory.fromUrl("views/user/dashboard/home.html", $stateParams);
                }
            });
          },
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
          templateProvider: function(session, $stateParams, $templateFactory){
            return session.loadRole().then(function(role){
                if(session.role == 'admin'){
                  return $templateFactory.fromUrl("views/admin/pages/login.html", $stateParams);
                } else {
                  return $templateFactory.fromUrl("views/user/pages/login.html", $stateParams);
                }
            });
          },
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
          templateProvider: function(session, $stateParams, $templateFactory){
            return session.loadRole().then(function(role){
                if(session.role == 'admin'){
                  return $templateFactory.fromUrl("views/admin/pages/signup.html", $stateParams);
                } else {
                  return $templateFactory.fromUrl("views/user/pages/signup.html", $stateParams);
                }
            });
          },
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
          templateProvider: function(session, $stateParams, $templateFactory){
            return session.loadRole().then(function(role){
                if(session.role == 'admin'){
                  return $templateFactory.fromUrl("views/admin/member.html", $stateParams);
                } else {
                  return $templateFactory.fromUrl("views/user/member.html", $stateParams);
                }
            });
          },
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
          templateProvider: function(session, $stateParams, $templateFactory){
            return session.loadRole().then(function(role){
                if(session.role == 'admin'){
                  return $templateFactory.fromUrl("views/admin/viewmember.html", $stateParams);
                } else {
                  return $templateFactory.fromUrl("views/user/viewmember.html", $stateParams);
                }
            });
          },
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
          templateProvider: function(session, $stateParams, $templateFactory){
            return session.loadRole().then(function(role){
                if(session.role == 'admin'){
                  return $templateFactory.fromUrl("views/admin/jamat.html", $stateParams);
                } else {
                  return $templateFactory.fromUrl("views/user/jamat.html", $stateParams);
                }
            });
          },
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
          templateProvider: function(session, $stateParams, $templateFactory){
            return session.loadRole().then(function(role){
                if(session.role == 'admin'){
                  return $templateFactory.fromUrl("views/admin/states.html", $stateParams);
                } else {
                  return $templateFactory.fromUrl("views/user/states.html", $stateParams);
                }
            });
          },
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
          templateProvider: function(session, $stateParams, $templateFactory){
            return session.loadRole().then(function(role){
                if(session.role == 'admin'){
                  return $templateFactory.fromUrl("views/admin/cities.html", $stateParams);
                } else {
                  return $templateFactory.fromUrl("views/user/cities.html", $stateParams);
                }
            });
          },
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
          templateProvider: function(session, $stateParams, $templateFactory){
            return session.loadRole().then(function(role){
                if(session.role == 'admin'){
                  return $templateFactory.fromUrl("views/admin/zone.html", $stateParams);
                } else {
                  return $templateFactory.fromUrl("views/user/zone.html", $stateParams);
                }
            });
          },
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
      const restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
      const loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
        $location.path('/login');
      }
    });
  }

})();
