'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngIOS9UIWebViewPatch'
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/geolocationtweets');
  $stateProvider
  // this state is placed in the <ion-nav-view> in the index.html
  .state('main', {
    url: '/main',
    abstract: true,
    templateUrl: 'main/templates/tabs.html',
    controller: 'TabsCtrl as tabsC'
  })
  .state('main.geolocationtweets', {
    url: '/geolocationtweets',
    views: {
      'tab-tweets': {
        templateUrl: 'main/templates/geolocationtweets.html',
        controller: 'GeotweetsCtrl as geotweetsC',
        resolve: {
          token: function (TwitterService) {
            return TwitterService.getToken();
          }
        }
      }
    }
  })
  .state('main.tweetshashtag', {
    url: '/geolocationtweets/tweetshashtag/:hashtag',
    views: {
      'tab-tweets': {
        templateUrl: 'main/templates/tweetshashtag.html',
        controller: 'TweetshashtagCtrl as tweetshashtagC'
      }
    }
  })
  .state('main.tweetDetail', {
    url: '/geolocationtweets/tweetshashtag/:hashtag/tweetdetail/:tweetid',
    views: {
      'tab-tweets': {
        templateUrl: 'main/templates/tweetdetail.html',
        controller: 'TweetDetailCtrl as tweetdetailC'
      }
    }
  })
  .state('main.imprint', {
    url: '/imprint',
    views: {
      'tab-imprint': {
        templateUrl: 'main/templates/imprint.html',
        controller: 'ImprintCtrl as imprintC'
      }
    }
  })
  .state('main.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'main/templates/about.html',
        controller: 'AboutCtrl as aboutC'
      }
    }
  })
  .state('main.network', {
    url: '/network',
    views: {
      'tab-network': {
        templateUrl: 'main/templates/network.html',
        controller: 'NetworkCtrl as networkC'
      }
    }
  });
}).config(function ($ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.tabs.style('standard');
});
