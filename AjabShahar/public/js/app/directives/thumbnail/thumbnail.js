'use strict';

angular.module("contentModule", [])
.directive("thumbnailWithBubble", function() {
    return {
        restrict: 'E',
        scope: {
            videoId: '=',
        },
        templateUrl:'<div class="thumbnail" ng-class="shiftRight(1)"><div class="thumbnailVideo"><youtube width="100%" height="100%" videoid="O-WVDBpBdRY"></youtube></div><div class="thumbnailDesc"><h3 class="selected">Practice the art of dying!</h3><small>sings PARVATHY BAUL</small></div></div>',
        controller: ['$scope', function($scope) {
        var x= $scope.videoId;
        }]
    }
});