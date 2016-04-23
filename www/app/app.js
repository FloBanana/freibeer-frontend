'use strict';
angular.module('app', ['ionic'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider, $provide, $httpProvider) {
    $httpProvider.interceptors.push(function() {
      return {
        request: function(req) {
          // Transform **all** $http calls so that requests that go to `/`
          // instead go to a different origin, in this case localhost:3000
          if (req.url.charAt(0) === '/') {
            //req.url = 'http://ec2-52-58-3-95.eu-central-1.compute.amazonaws.com:3000' + req.url;
            req.url = 'http://localhost:3000' + req.url;
            // and make sure to send cookies too
            req.withCredentials = true;
          }

          return req;
        }
      };
    });
    $stateProvider
      .state('loading', {
        url: '/loading',
        template: '<ion-spinner style="text-align: center; margin-top: 50%"></ion-spinner>',
        controller: 'LoadingCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/pages/login/login.html',
        controller: 'LoginCtrl'
      }).state('mainscreen', {
        url: '/mainscreen',
        templateUrl: 'app/pages/mainscreen/mainscreen.html',
        controller: 'MainscreenCtrl'
    }).state('reportscreen', {
        url: '/reportscreen',
        templateUrl: 'app/pages/reportscreen/reportscreen.html',
        controller: 'ReportscreenCtrl'
      });
    $urlRouterProvider.otherwise('/loading');
  })
  /*.factory('$user', function(User) {
    var userService = {};

    userService.load = function() {
      User.findById({
        id: 'me'
      }, function(v) {
        userService.data = v;
      });
    };

    userService.load();

    return userService;
  })
  .factory('$xingLogin', function($user) {
    return function() {
      var url = 'http://localhost:3000/auth/xing';

      var ref = window.open(url, '_blank', 'location=no');

      // For Cordova
      if (window.cordova) {
        ref.addEventListener('loadstop', function(ev) {
          if (ev.url.indexOf('/index.html') !== -1) {
            ref.close();
            $user.load();
          }
        });
      } else {
        var interval = setInterval(function() {
          if (ref.closed) {
            $user.load();
            clearInterval(interval);
          }
        }, 100);
      }
    };
});*/
