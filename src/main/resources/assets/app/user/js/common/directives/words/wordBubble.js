'use strict';

thumbnailModule.directive("wordBubble", function() {
    return {
        restrict: 'E',
        scope: {
            id:'@',
            wordTransliteration:'@',
            wordTranslation:'@',
            transliterationIntro:'@',
            wordOriginal:'@',
        },
        templateUrl:'/user-js/common/templates/words/wordBubble.html',
        controller: function($scope) {
        }
    }
});