'use strict';
angular.module('main')
  .controller('DetailCtrl', ['$scope', '$stateProvider', function ($scope, $stateProvider) {

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.id = $stateProvider.id;
    });

  }]);
