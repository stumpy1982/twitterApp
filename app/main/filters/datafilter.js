'use strict';
angular.module('main').filter('StringToDate', function () {

  // returns the right date format
  return function (input) {
    var _date = new Date(input);
    return _date;
  };
});
