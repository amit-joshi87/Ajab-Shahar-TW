var songDetailsController = function($scope, $window,$location,songContentService){
    $scope.formInfo = {
    singers:[]
    };
    //  $scope.formInfo.singers = [];
    $scope.formInfo.poets = [];
    $scope.singersList = [];
    $scope.poetsList = [];
    $scope.title = {};
    $scope.songTitle = {};
    $scope.categoryList = [];
    $scope.songCategoryList = [];
    $scope.mediaCategoryList = [];
    $scope.umbrellaTitleList = [];
    $scope.poets = [];
    $scope.songTitleList = [];
    $scope.coupletList = [];
    $scope.formInfo.lyricsData={"content":[]};

    $scope.init = function(){
        songContentService.getAllUmbrellaTitles().success(function(umbrellaTitleList){
            $scope.umbrellaTitleList = umbrellaTitleList;
        });

        songContentService.getAllSongTitles().success(function(songTitleList){
            $scope.songTitleList= songTitleList;
        });


        songContentService.getAllSingers().success(function(allSingers){
            $scope.singers = allSingers;
            $scope.singersList = $scope.singers.people;
            angular.forEach($scope.singersList,function(singer){
              if(singer.lastName == null)
                singer.lastName = '';
            });
        });

        songContentService.getAllPoets().success(function(allPoets){
            $scope.poets = allPoets.people;
            $scope.poetsList = $scope.poets;
        });

        songContentService.getAllCouplets().success(function(allCouplets){
            $scope.coupletList = allCouplets;
        });

        songContentService.getSongCategories().success(function(categoryList){
            $scope.songCategoryList = categoryList;
        });

        songContentService.getMediaCategories().success(function(categoryList){
            $scope.mediaCategoryList = categoryList;
        });
    }

    $scope.saveData = function(){
        var youtubeIdIsNull = $scope.formInfo.youtubeVideoId == undefined || $scope.formInfo.youtubeVideoId == "";

        if(youtubeIdIsNull){
          $scope.formInfo["mediaCategory"] =  $scope.mediaCategoryList.filter(function( mediaCategory ) {
            return mediaCategory.name == "audio only";
          })[0];
        }
        else {
          $scope.formInfo["mediaCategory"] =  $scope.mediaCategoryList.filter(function( mediaCategory ) {
            return mediaCategory.name == "audio & video";
          })[0];
        }
        songContentService.createSong($scope.formInfo).success(function(data){
              $window.location.href = '/admin/partials/songs/edit.html?id='+data;
        });
    };


    $scope.getSongData = function(){
        $scope.urlId = $location.search().id;
        songContentService.getSong($scope.urlId)
            .success(function (data,status) {
                          angular.forEach($scope.singersList,function(singer){
                              angular.forEach(data.singers,function(selectedSinger){
                                 if(selectedSinger.id === singer.id)
                                   singer.ticked=true;
                              });

                          });
                          $scope.formInfo = data;
      });
    };

    $scope.updateSong = function(){
     var youtubeIdIsNull = $scope.formInfo.youtubeVideoId == undefined || $scope.formInfo.youtubeVideoId == "";

         if(youtubeIdIsNull){
           $scope.formInfo["mediaCategory"] =  $scope.mediaCategoryList.filter(function( mediaCategory ) {
             return mediaCategory.name == "audio only";
           })[0];
         }
         else {
           $scope.formInfo["mediaCategory"] =  $scope.mediaCategoryList.filter(function( mediaCategory ) {
             return mediaCategory.name == "audio & video";
           })[0];
         }

         songContentService.editSong($scope.formInfo).success(function(data){
            $window.location.href = '/admin/partials/home.html';
         });
    };

    $scope.redirectToEnterPage= function(isDirty){
        if(isDirty)
        {
            alert('This data is not updated');
        }
        $window.location.href = '/admin/partials/songs/details.html';
    };

    $scope.init();
}

songsAdminApp.controller('songDetailsController',['$scope','$window','$location','songContentService',songDetailsController]);