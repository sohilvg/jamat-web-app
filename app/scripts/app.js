"use strict";
/**
 * @ngdoc overview
 * @name AIMJF
 * @description
 * # AIMJF
 *
 * Main module of the application.
 */
angular.module('Authentication', []);
const app = angular.module('app', ['ui.router']);

app.service('session', function ($timeout, $q) {
  this.role = null;

  this.loadRole = function () {
    //load role using axax request and return promise
  };
});
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateProvider: function (session, $stateParams, $templateFactory) {
      return session.loadRole().then(function (role) {
        if (session.role == 'admin') {
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
  .module("AIMJF", [
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
                  name: "AIMJF",
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
          templateProvider: function (session, $stateParams, $templateFactory) {
            return session.loadRole().then(function (role) {
              if (session.role == 'admin') {
                return $templateFactory.fromUrl("views/admin/dashboard/home.html", $stateParams);
              } else {
                return $templateFactory.fromUrl("views/user/dashboard/home.html", $stateParams);
              }
            });
          },
          resolve: {
            loadMyFiles: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "AIMJF",
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
          templateProvider: function (session, $stateParams, $templateFactory) {
            return session.loadRole().then(function (role) {
              if (session.role == 'admin') {
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
                name: "AIMJF",
                files: ["scripts/controllers/loginController.js"]
              });
            }
          }
        })
        .state("signup", {
          templateProvider: function (session, $stateParams, $templateFactory) {
            return session.loadRole().then(function (role) {
              if (session.role == 'admin') {
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
                name: "AIMJF",
                files: ["scripts/controllers/signupController.js"]
              });
            }
          }
        })
        .state("dashboard.member", {
          templateProvider: function (session, $stateParams, $templateFactory) {
            return session.loadRole().then(function (role) {
              if (session.role == 'admin') {
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
                name: "AIMJF",
                files: ["scripts/controllers/memberController.js"]
              });
            }
          }
        })
        .state("dashboard.viewmember", {
          templateProvider: function (session, $stateParams, $templateFactory) {
            return session.loadRole().then(function (role) {
              if (session.role == 'admin') {
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
                name: "AIMJF",
                files: ["scripts/controllers/viewmemberController.js"]
              });
            }
          }
        })
        .state("dashboard.jamat", {
          templateProvider: function (session, $stateParams, $templateFactory) {
            return session.loadRole().then(function (role) {
              if (session.role == 'admin') {
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
                name: "AIMJF",
                files: ["scripts/controllers/jamatController.js"]
              });
            }
          }
        })
        .state("dashboard.states", {
          templateProvider: function (session, $stateParams, $templateFactory) {
            return session.loadRole().then(function (role) {
              if (session.role == 'admin') {
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
                name: "AIMJF",
                files: ["scripts/controllers/statesController.js"]
              });
            }
          }
        })
        .state("dashboard.cities", {
          templateProvider: function (session, $stateParams, $templateFactory) {
            return session.loadRole().then(function (role) {
              if (session.role == 'admin') {
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
                name: "AIMJF",
                files: ["scripts/controllers/citiesController.js"]
              });
            }
          }
        })
        .state("dashboard.zone", {
          templateProvider: function (session, $stateParams, $templateFactory) {
            return session.loadRole().then(function (role) {
              if (session.role == 'admin') {
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
                name: "AIMJF",
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
      //         name: 'AIMJF',
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
    .module('app', ['ngRoute', 'ngResource', 'AuthServices'
      , 'ngCookies'])
    .config(config)
    .run(run);

  config.$inject = ['$routeProvider', '$locationProvider'];
  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'HomeController',
        templateUrl: 'home/home.view.html',
        controllerAs: 'vm',
        requiresAuthentication: true

      })
      .when('/member', {
        controller: 'MemberCtrl',
        templateUrl: "views/member.html",
        controllerAs: 'vm',
        permissions: ["administration"]

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
// angular.module('AuthServices', ['ngResource', 'ngStorage'])
//   .factory('Auth', function ($resource, $rootScope, $sessionStorage, $q) {

//     /**
//      *  User profile resource
//      */
//     const Profile = $resource('/api/profile', {}, {
//       login: {
//         method: "POST",
//         isArray: false
//       }
//     });

//     const auth = {};

//     /**
//      *  Saves the current user in the root scope
//      *  Call this in the app run() method
//      */
//     auth.init = function () {
//       if (auth.isLoggedIn()) {
//         $rootScope.user = auth.currentUser();
//       }
//     };

//     auth.login = function (username, password) {
//       return $q(function (resolve, reject) {
//         Profile.login({ username: username, password: password }).$promise
//           .then(function (data) {
//             $sessionStorage.user = data;
//             $rootScope.user = $sessionStorage.user;
//             resolve();
//           }, function () {
//             reject();
//           });
//       });
//     };


//     auth.logout = function () {
//       delete $sessionStorage.user;
//       delete $rootScope.user;
//     };


//     auth.checkPermissionForView = function (view) {
//       if (!view.requiresAuthentication) {
//         return true;
//       }

//       return userHasPermissionForView(view);
//     };


//     const userHasPermissionForView = function (view) {
//       if (!auth.isLoggedIn()) {
//         return false;
//       }

//       if (!view.permissions || !view.permissions.length) {
//         return true;
//       }

//       return auth.userHasPermission(view.permissions);
//     };


//     auth.userHasPermission = function (permissions) {
//       if (!auth.isLoggedIn()) {
//         return false;
//       }

//       const found = false;
//       angular.forEach(permissions, function (permission, index) {
//         if ($sessionStorage.user.user_permissions.indexOf(permission) >= 0) {
//           found = true;
//           return;
//         }
//       });

//       return found;
//     };


//     auth.currentUser = function () {
//       return $sessionStorage.user;
//     };


//     auth.isLoggedIn = function () {
//       return $sessionStorage.user != null;
//     };


//     return auth;
//   });
// angular.module('app').controller('LoginCtrl', function ($scope, $location, Auth) {

//   $scope.email = "";
//   $scope.password = "";
//   $scope.failed = false;

//   $scope.login = function () {
//     Auth.login($scope.email, $scope.password)
//       .then(function () {
//         $location.path("/home");
//       }, function () {
//         $scope.failed = true;
//       });
//   };

// });
// angular.module('app')
//   .controller('MainCtrl', function ($scope, $rootScope, $location, Auth) {

//     $rootScope.logout = function () {
//       Auth.logout();
//       $location.path("/login");
//     };

//   });