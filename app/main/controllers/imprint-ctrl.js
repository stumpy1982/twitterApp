'use strict';
angular.module('main')
.controller('ImprintCtrl', function ($log, $scope, $ionicSideMenuDelegate) {

  // Open menu
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

});
