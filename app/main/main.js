'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngIOS9UIWebViewPatch'
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/geotweets');
  $stateProvider
  // this state is placed in the <ion-nav-view> in the index.html
  .state('main', {
    url: '/main',
    abstract: true,
    templateUrl: 'main/templates/tabs.html',
    controller: 'TabsCtrl as tabsC'
  })
  .state('main.geotweets', {
    url: '/geotweets',
    views: {
      'tab-tweets': {
        templateUrl: 'main/templates/geotweets.html',
        controller: 'GeotweetsCtrl as geotweetsC',
        resolve: {
          itemG: function (TwitterService) {
            return TwitterService.getToken();
          }
        }
      }
    }
  })
  .state('main.tweetDetail', {
    url: '/geotweets/tweetshashtag/:hashtag/detail/:tweetid',
    views: {
      'tab-tweets': {
        templateUrl: 'main/templates/tweetdetail.html',
        controller: 'TweetDetailCtrl as tweetdetailC'
      }
    }
  })
  .state('main.tweetshashtag', {
    url: '/geotweets/tweetshashtag/:hashtag',
    views: {
      'tab-tweets': {
        templateUrl: 'main/templates/tweetshashtag.html',
        controller: 'TweetshashtagCtrl as tweetshashtagC'
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
  .state('main.menu', {
    url: '/main/menu',
    views: {
      'tab-menu': {
        templateUrl: 'main/templates/menu.html',
        // controller: 'MenuCtrl as menuC'
      }
    }
  });
});
