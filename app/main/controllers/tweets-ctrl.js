'use strict';
angular.module('main')
  .controller('TweetsCtrl', function ($scope, $ionicPlatform, $twitterApi, $cordovaOauth) {

    var twitterKey = 'STORAGE.TWITTER.KEY';
    var clientId = 'sbFAirhnWTEE1e26X2ewH643D';
    var clientSecret = 'C1endkoWh1Jve2FqDk1Y8lNqlhW4lDjEOGvcFLHI2NEx8PE2hU';
    var myToken = '';

    $scope.tweet = {};
    $scope.searchTag = 'Krapfen';

    $ionicPlatform.ready(function () {
      myToken = JSON.parse(window.localStorage.getItem(twitterKey));
      if (myToken === '' || myToken === null) {
        $cordovaOauth.twitter(clientId, clientSecret).then(function (succ) {
          myToken = succ;
          window.localStorage.setItem(twitterKey, JSON.stringify(succ));
          $twitterApi.configure(clientId, clientSecret, succ);
          $scope.showTweetTimeline();
        }, function (error) {
          console.log(error);
        });
      } else {
        $twitterApi.configure(clientId, clientSecret, myToken);
        $scope.showTweetTimeline();
      }
    });

    $scope.showTweetTimeline = function () {
      $twitterApi.searchTweets($scope.searchTag).then(function (tweets) {
        $scope.tweet_timeline = tweets;
      });
    };

    $scope.doRefresh = function () {
      $scope.showTweetTimeline($scope.searchTag);
      $scope.$broadcast('scroll.refreshComplete');
    };

  });
