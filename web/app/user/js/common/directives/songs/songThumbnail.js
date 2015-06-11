'use strict';

thumbnailModule.directive("songThumbnail", function ($timeout) {
    return {
        replace: true,
        restrict: 'E',
        scope: {
            englishTransliteration: '@',
            englishTranslation: '@',
            singer: '@',
            singers: '@',
            imgSrc: '@',
            url: '@',
            categoryName: '@',
            duration: '@',
            poet: '@',
            customStyle: '@',
            contentId: '@',
            id: '@',
            open: '&' //open click handler ~ callback to controller
        },
        templateUrl: '/user/js/common/templates/songs/songThumbnail.html',
        controller: function ($scope,$rootScope) {
            $scope.textRepresentation = 'Transliteration';
            $scope.shouldShowDetails = true;
            $scope.noun = "";
            $scope.multipleSingers = false;

            $scope.onTimeOut = function () {
                $scope.hideDetails();
            };

            $timeout($scope.onTimeOut, 1000);

            var setTitles = function(){
                $scope.primaryTitle =   ($scope.textRepresentation === 'Transliteration') ? $scope.englishTransliteration : $scope.englishTranslation;
                $scope.secondaryTitle =($scope.textRepresentation === 'Transliteration') ? $scope.englishTranslation : $scope.englishTransliteration;
            };

            $rootScope.$watch('contentTextRepresentation', function ( value) {
                $scope.textRepresentation = value;
                setTitles();
            });

            var containsAmpersand = function(singer) {
                return  singer.name.indexOf('&') > 0;
            };

            $scope.init = function () {
                if(!_.isEmpty($scope.singers) && ($scope.singers.length > 1 || containsAmpersand($scope.singers[0])) ){
                    $scope.multipleSingers = true;
                    $scope.noun = "sing";
                    setTitles();
                    return;
                }
                $scope.multipleSingers = false;
                $scope.noun = "sings";
                return;
            };

            $scope.showDetails = function () {
                $scope.shouldShowDetails = true;
            };

            $scope.hideDetails = function () {
                $scope.shouldShowDetails = false;
            };

            $scope.init();
        }
    }
});
