'use strict';
angular.module('main')
  .controller('TweetshashtagCtrl', function ($scope, $stateParams, $ionicSideMenuDelegate, $log, $ionicPlatform, $window, $ionicPopover, $filter, TwitterService) {

    this.controllerData = TwitterService.serviceData;
    var hashtag = $stateParams.hashtag;
    TwitterService.serviceData.hashtag = hashtag;
    var that = this;

    // Open Sidemenu
    $scope.openMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };

    // Get Tweets by Hashtag
    TwitterService.getTweetsByHashtag('ionicloader').then(function () {
      $log.log(that.controllerData.tweets);
    });

    // Pull to refresh
    $scope.doRefresh = function () {
      TwitterService.getTweetsByHashtag('noionicloader').then(function () {
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    // Search Submit
    $scope.submit = function () {
      TwitterService.serviceData.hashtag = $scope.searchword;
      TwitterService.getTweetsByHashtag();
      $log.log(TwitterService.serviceData.searchword);
      document.activeElement.blur();
    };

    // Popover Template
    var template = '<ion-popover-view><ion-header-bar>' +
    '<h3 class="title">Filter by</h3></ion-header-bar>' +
    '<ion-content><div class="list">' +
    '<label ng-click="sortTweets(\'date\')" class="item item-radio"><input type="radio" name="filtergroup">' +
      '<div class="item-content">Date</div></label>' +
    '<label ng-click="sortTweets(\'author\')" class="item item-radio"><input type="radio" name="filtergroup">' +
      '<div class="item-content">Author</div></label>' +
    '</div></ion-content></ion-popover-view>';

    // get the popover-template
    $scope.popover = $ionicPopover.fromTemplate(template, {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    });

    // Open Popover
    $scope.openPopover = function ($event) {
      $scope.popover.show($event);
    };

    // Close Popover
    $scope.closePopover = function () {
      $scope.popover.hide();
    };

    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.popover.remove();
    });

    // Sort Tweets by date or user.name
    $scope.sortTweets = function (sortvalinput) {
      switch (sortvalinput) {
        case 'date':
          $scope.sortval = '-created_at';
          break;
        case 'author':
          $scope.sortval = 'user.name';
          break;
      }
    };

  });
