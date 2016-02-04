'use strict';
angular.module('PJsTwitterApp', [
  'ionic',
  'ngCordova',
  'ngTwitter',
  'ngCordovaOauth',
  'main'
])

  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.backButton.text('');
    $ionicConfigProvider.backButton.icon('ion-arrow-left-c');
    $ionicConfigProvider.backButton.previousTitleText(false);
  });
