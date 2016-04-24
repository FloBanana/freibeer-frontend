'use strict';
angular.module('app')
  .controller('MainscreenCtrl', function($state, $scope, $user, Report, User) {
    if (!$user.data) {
      $state.go('login');
    }
    $scope.message = "test";
    $scope.notification = {};

    $scope.position = {};
    $scope.position.loaded = false;
    var onSuccess = function(position) {
      $scope.position = {
        'lat': position.coords.latitude,
        'lng': position.coords.longitude,
        'accuracy': position.coords.accuracy,
        'timestamp': position.timestamp
      };
      $scope.position.loaded = true;
      console.log($scope.position);
      Report.getNearbyReport({
        request: {
          location: {
            lat: $scope.position.lat,
            lng: $scope.position.lng
          },
          userId: $user.data.id
        }
      }).$promise.then(function(report, err) {
        if (!(Object.keys(report).length === 0)) {
          $scope.notification = report.report;
        }
      });
    };

    function onError(error) {
      alert("Leider konnte der Standort nicht geladen werden");
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function getPhoto() {

    };

    $scope.enterReport = function() {
      /*navigator.camera.getPicture(onSuccess, onFail, {
        sourceType: Camera.PictureSourceType.CAMERA,
        correctOrientation: true,
        quality: 75,
        targetWidth: 200,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.PNG,
        saveToPhotoAlbum: false
      });

      function onSuccess(imageData) {
          alert(imageData);
          var image = "data:image/png;base64," + imageData;*/
        User.reports.create({
          id: 'me'
        }, {
          location: {
            lat: $scope.position.lat,
            lng: $scope.position.lng
          },
          time: new Date(),
          image: "no img",
          note: "no note"
        }).$promise.then(function(result, err) {
          if (result.id) {
            alert("Sharing ist caring!")
          }
        });
        /*$scope.$apply();
      }

      function onFail(message) {
        alert('Failed because: ' + message);
    }*/
    };

  });
