'use strict';
angular.module('main')
.service('Main', function ($log, $ionicPlatform, $state, $window, $ionicLoading, $ionicPopup) {

  // show ionic loader on load
  this.showLoader = function () {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  // hide ionic loader
  this.hideLoader = function () {
    $ionicLoading.hide();
  };

  // popup for error messages
  this.showAlert = function (text) {
    $ionicPopup.alert({
      title: 'Error',
      template: text
    });
  };

  this.browse = function (url)
  {
    if (ionic.Platform.isWebView()) {
      $window.webview.openWebView(null, null, {
        iconColor: '#ffffff',
        backgroundColor: '#4a87ee',
        url: url,
        visibleAddress: false,
        editableAddress: false,
        icons: {
          backward: true,
          forward: true,
          refresh: true
        }
      });
    }
  };

});
