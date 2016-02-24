'use strict';
angular.module('main')
.controller('GeotweetsCtrl', function ($scope, $state, $ionicSideMenuDelegate, $cordovaGeolocation, $cordovaVibration, TwitterService, Main) {

  this.controllerData = TwitterService.serviceData;
  var positionG = null;
  var posOptions = {timeout: 21000, enableHighAccuracy: true};

  // show ionic loader
  Main.showIonicLoader();

  // Get Current User Location
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
    positionG = position.coords;
    TwitterService.getGeoHashtags(position.coords.latitude, position.coords.longitude);
  }, function () {
    Main.hideIonicLoader();
    Main.showAlert('Problem with Geolocation');
  });

  // Pull to refresh
  $scope.doRefresh = function () {
    TwitterService.getGeoHashtags(positionG.latitude, positionG.longitude)
    .then(function () {
      $scope.$broadcast('scroll.refreshComplete');
    });
    $cordovaVibration.vibrate(100);
  };

  // open Sidemenu
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  // Search & submit
  $scope.submit = function () {
    TwitterService.serviceData.hashtag = $scope.searchword;
    $state.go('main.tweetshashtag', { hashtag: $scope.searchword });
  };
});
