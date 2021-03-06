'use strict';
angular.module('main')
  .controller('NetworkCtrl', function ($cordovaNetwork) {

    this.networkData = {
      Networktype: null,
      State: null
    };

    this.networkData.Networktype = $cordovaNetwork.getNetwork();
    if ($cordovaNetwork.isOnline()) {
      this.networkData.State = 'Online';
    } else {
      this.networkData.State = 'Offline';
    }

  });
