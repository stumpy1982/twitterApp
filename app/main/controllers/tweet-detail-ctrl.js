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
  // TODO not working yet
  this.getLink = function ($event) {
    if ($event.srcElement.tagName === 'a' && $event.srcElement.href !== '') {
      Main.browse($event.srcElement.href);
    }
  };

});
