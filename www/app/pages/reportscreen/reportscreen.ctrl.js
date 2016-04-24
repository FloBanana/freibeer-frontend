'use strict';
angular.module('app')
  .controller('ReportscreenCtrl', function($scope, $stateParams, $cordovaGeolocation, Report) {
    Report.findOne({
      filter: {
        where: {
          id: $stateParams.id
        }
      }
    }).$promise.then(function(report, err) {
      $scope.report = report;
    });
});
