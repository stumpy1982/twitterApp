'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngSanitize'
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/list');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/tabs.html'
    })
    .state('main.list', {
      url: '/list',
      views: {
        'tab-list': {
          templateUrl: 'main/templates/list.html',
          controller: 'TweetsCtrl as tweetctrl'
        }
      }
    })
    .state('main.imprint', {
      url: '/imprint',
      views: {
        'tab-imprint': {
          templateUrl: 'main/templates/imprint.html',
        }
      }
    })
    .state('main.about', {
      url: '/about',
      views: {
        'tab-about': {
          templateUrl: 'main/templates/about.html',
        }
      }
    })
    .state('main.listDetail', {
      url: '/list/detail/:id',
      views: {
        'tab-detail-list': {
          templateUrl: 'main/templates/list-detail.html',
          controller: 'DetailCtrl as detailctrl'
        }
      }
    })
    .state('main.menu', {
      url: '/main/menu',
      views: {
        'tab-menu': {
          templateUrl: 'main/templates/menu.html',
          controller: 'MenuCtrl as menuC'
        }
      }
    });
});
