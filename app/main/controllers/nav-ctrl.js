'use strict';
angular.module('main')
  .controller('MenuCtrl', function ($scope, $ionicSideMenuDelegate) {

    $scope.showMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.showRightMenu = function () {
      $ionicSideMenuDelegate.toggleRight();
    };

  });
