'use strict';
angular.module('main')
.controller('TweetDetailCtrl', function ($log, $scope, $ionicSideMenuDelegate, $stateParams, Main, TwitterService) {

  var tweetid = $stateParams.tweetid;
  this.controllerData = TwitterService.serviceData;
  var that = this;

  // Get Tweet by Tweet ID
  TwitterService.getTweetbyID(tweetid).then(function () {
    $log.log(that.controllerData.tweet);
  });

  // Open Link in InApp-Browser
  this.getLink = function ($event) {
    $event.preventDefault();
    if (typeof $event.srcElement.tagName === 'string' && $event.srcElement.tagName.toLowerCase() === 'a' && $event.srcElement.href !== '') {
      Main.browse($event.srcElement.href);
    }
  };

});
