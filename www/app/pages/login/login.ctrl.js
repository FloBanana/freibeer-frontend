'use strict';
angular.module('app')
  .controller('LoginCtrl', function($scope, $user, $xingLogin){
      $scope.user = $user;
      $scope.xingLogin = $xingLogin;
  });
