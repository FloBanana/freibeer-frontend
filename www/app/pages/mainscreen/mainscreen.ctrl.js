'use strict';
angular.module('app')
  .controller('MainscreenCtrl', function($scope){
      $scope.position = {};
      var onSuccess = function(position) {
        $scope.position = {
          'lat': position.coords.latitude,
          'lng': position.coords.longitude,
          'accuracy': position.coords.accuracy,
          'timestamp': position.timestamp
        };
      };

      function onError(error) {
          alert("Leider konnte der Standort nicht geladen werden");
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError);

      $scope.enterReport = function() {

      };
  });
