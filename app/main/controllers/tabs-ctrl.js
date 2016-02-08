'use strict';
angular.module('main')
.controller('TabsCtrl', function ($scope, $ionicSideMenuDelegate) {

  // Open menu
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

});
