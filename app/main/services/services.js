'use strict';
angular.module('main')
.service('Main', function ($log, $ionicPlatform, $state, $window, $ionicLoading, $ionicPopup) {

  // show ionic loader on load
  this.showIonicLoader = function () {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  // hide ionic loader
  this.hideIonicLoader = function () {
    $ionicLoading.hide();
  };

  // popup window for error messages
  this.showAlert = function (text) {
    $ionicPopup.alert({
      title: 'Error',
      template: text
    });
  };
});
