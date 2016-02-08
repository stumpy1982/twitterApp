'use strict';
angular.module('main')
.service('TwitterService', function ($log, $ionicPlatform, $state, $window, $http, Main) {

  var consumerKey = encodeURIComponent('7tpSCI61EW6ZYRqWkBZgCD89Y');
  var consumerSecret = encodeURIComponent('rsE8zFFo7zPn7J5KO7rmC9n2dEPmu4eSOmGFjDLvm8EBmAR6Bi');


  this.serviceData = {
    tweets: [],
    tweet: null,
    hashtags: [''],
    hashtag: '#angular'
  };


  this.getToken = function () {
    var tokenCredentials = $window.btoa(consumerKey + ':' + consumerSecret);
    return $http({
      method: 'POST',
      url: 'https://api.twitter.com/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': 'Basic ' + tokenCredentials
      }, data: 'grant_type=client_credentials'
    })
    .then(function (result) {
      /*jshint -W106 */
      if (result.data && result.data.access_token) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.access_token;
      }
      return true;
    })
    .catch(function () {
      Main.hideIonicLoader();
      return Main.showAlert('No Twitter Security Token');
    });
  };

  // Get Tweets based on the tweet ID
  this.getTweetbyID = function (twitterid)
  {
    Main.showIonicLoader();
    var that = this;
    return $http({
      method: 'GET',
      url: 'https://api.twitter.com/1.1/statuses/show.json',
      params: {id: twitterid}
    }).then(function successCallback (response) {
      that.serviceData.tweet = response.data;
      Main.hideIonicLoader();
      return response;
    }, function errorCallback () {
      Main.hideIonicLoader();
      return Main.showAlert('Twitter Connection failed');
    });
  };

  // Get Tweets based on Hashtag
  this.getTweetsByHashtag = function (ionicloader)
  {
    var that = this;
    if (ionicloader === 'ionicloader') {
      Main.showIonicLoader();
      return $http({
        method: 'GET',
        url: 'https://api.twitter.com/1.1/search/tweets.json',
        params: {q: this.serviceData.hashtag, 'result_type': 'recent', count: 20 }
      }).then(function successCallback (response) {
        that.serviceData.tweets = response.data.statuses;
        Main.hideIonicLoader();
        return response;
      }, function errorCallback () {
        Main.hideIonicLoader();
        return Main.showAlert('Twitter Connection failed');
      });
    }
    else {
      return $http({
        method: 'GET',
        url: 'https://api.twitter.com/1.1/search/tweets.json',
        params: {q: this.serviceData.hashtag, 'result_type': 'recent', count: 20 }
      }).then(function successCallback (response) {
        that.serviceData.tweets = response.data.statuses;
        return response;
      }, function errorCallback () {
        return Main.showAlert('Twitter Connection failed');
      });
    }
  };

  // Get Trending Hashtags based on Where on Earth Identifier
  this.getGeoHashtags = function (latitude, longitude) {
    var that = this;
    return $http({
      method: 'GET',
      url: 'https://api.twitter.com/1.1/trends/closest.json?lat=' + latitude + '&long=' + longitude + ''
    }).then(function successCallback (response) {
      var woeid = response.data[0].woeid;
      return $http({
        method: 'GET',
        url: 'https://api.twitter.com/1.1/trends/place.json',
        params: {id: woeid}
      }).then(function successCallback (response) {
        var hashtags = response.data[0].trends;
        that.serviceData.hashtags = response.data[0].trends;
        Main.hideIonicLoader();
        return hashtags;
      }, function errorCallback () {
        Main.hideIonicLoader();
        return Main.showAlert('Twitter Connection failed');
      });
    }, function errorCallback () {
      Main.hideIonicLoader();
      return Main.showAlert('To much Requests');
    });
  };

});
