'use strict';

songsAdminApp.directive("lyrics", function() {
    return {
        replace : true,
        restrict: 'E',
        scope: {
            lyricsComponent:'=',
            originalText:'=',
        },
        templateUrl:'/admin/js/templates/lyrics.html',
        controller:function($scope){
            $scope.lyricsTextList = [];

            $scope.addLyricsText = function(){
                if($scope.lyricsText != ""){
                    $scope.lyricsTextList.push($scope.lyricsText);
                }
                $scope.lyricsText = "";
            }

            Array.prototype.insert = function (index, item) {
                this.splice(index, 0, item);
            };

            Array.prototype.move = function (old_index, new_index) {
                if (new_index >= this.length) {
                    var k = new_index - this.length;
                    while ((k--) + 1) {
                        this.push(undefined);
                    }
                }
                this.splice(new_index, 0, this.splice(old_index, 1)[0]);
                return this; // for testing purposes
            };

            $scope.moveItemUp = function(){
                var selectedSongIndex = $scope.lyricsTextList.indexOf($scope.selectedLyricsText);
                if(selectedSongIndex<0)
                    return;

                $scope.lyricsTextList.move(selectedSongIndex, selectedSongIndex-1);
            }

        }
    }
});