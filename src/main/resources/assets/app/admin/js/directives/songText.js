'use strict';

songsAdminApp.directive("songText", function() {
    return {
        replace : true,
        restrict: 'E',
        scope: {
            songText:'=',
            poets:'=',
        },
        templateUrl:'/admin/js/templates/songText.html',
        controller:function($scope){
            $scope.lyricsText = "";
            $scope.selectedLyricsContent = {};
            $scope.songText.openingCouplets = [];

            $scope.initializeContent = function(){
                $scope.newContent = {
                    "contentType":"stanza",
                    "englishTranslationText":"","englishTransliterationText":"","originalText":"",
                };
                $scope.openingCouplet = {
                    "contentType":"couplet",
                    "englishTranslationText":"","englishTransliterationText":"","originalText":"",
                };
            }

            $scope.initializeContent();

            $scope.shouldShowStanzaDetails = function(){
                return $scope.newContent.contentType == 'stanza' ;
            }

            $scope.shouldShowCoupletDetails = function(){
                return $scope.newContent.contentType == 'couplet' ;
            }

            $scope.edit = function(songText){
            }

            $scope.addLyricsText = function(){
                if(($scope.newContent.englishTranslationText == "" &&
                $scope.newContent.englishTransliterationText == "" &&
                $scope.newContent.originalText == "") && $scope.newContent.content == null)
                    return;
                var newElement = {};
                newElement.contentType = $scope.newContent.contentType;
                newElement.sequenceNumber = $scope.getSongContents().length;

                newElement.englishTranslationText = $scope.newContent.englishTranslationText;
                newElement.englishTransliterationText = $scope.newContent.englishTransliterationText;
                newElement.originalText = $scope.newContent.originalText;
                newElement.poet = $scope.newContent.poet;

                $scope.getSongContents().push(newElement);
                $scope.selectedLyricsContent = newElement;
                $scope.initializeContent();
            }

            $scope.addOpeningCouplet = function(){
               if(($scope.openingCouplet.englishTranslationText == "" &&
                   $scope.openingCouplet.englishTransliterationText == "" &&
                   $scope.openingCouplet.originalText == ""))
                           return;
               $scope.openingCouplet.sequenceNumber = $scope.songText.openingCouplets.length;
               $scope.songText.openingCouplets.push($scope.openingCouplet);
               $scope.initializeContent();
            }

            $scope.getSongContents = function(){
                if($scope.songText.songTextContents==null)
                    $scope.songText.songTextContents = [];
                return $scope.songText.songTextContents;
            }

            $scope.showLyrics = function(){
                return $scope.getSongContents().length != 0;
            }

        }
    }
});